'use server';

import { CompletedPart, CompleteMultipartUploadCommand, CompleteMultipartUploadRequest } from '@aws-sdk/client-s3';
import { render } from '@react-email/render';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import RequirementsSentMailContent from '@/app/(content)/submissions/[id]/requirements/_components/requirements-sent-mail-content';
import { submissionRequirementsSchema } from '@/app/(content)/submissions/[id]/requirements/_utils';
import getUserAsAdminById from '@/app/(content)/submissions/_utils/get-user-as-admin-by-id';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import Constants from '@/utils/constants';
import MailTemplate from '@/utils/mail/mail-template';
import sendMail from '@/utils/mail/send-mail';
import s3Client, { BUCKET_NAME_UNPROCESSED } from '@/utils/s3';
import { getSupabaseServerClient } from '@/utils/supabase/client';

interface Payload {
  fileName: string;
  uploadId: CompleteMultipartUploadRequest['UploadId'];
  parts: CompletedPart[];
  submissionId: string;
  clientDescription: string;
}

const actionCompleteUploadAndSendRequirements = async (payload: Payload) => {
  const { fileName, uploadId, parts, submissionId, clientDescription } = payload;

  submissionRequirementsSchema.parse({ clientDescription });
  const supabase = getSupabaseServerClient();
  const { data: session, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session.session) throw new Error();

  const isTrainerAccount = await checkIsTrainerAccount(session.session.user.id);

  if (isTrainerAccount) {
    throw new Error('Trainer account cannot upload videos');
  }

  const completeMultipartUploadResponse = await s3Client.send(
    new CompleteMultipartUploadCommand({
      Bucket: BUCKET_NAME_UNPROCESSED,
      Key: fileName,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    }),
  );

  const { data: submission, error: updateSubmissionError } = await supabase
    .from('submissions')
    .update({
      video_key: completeMultipartUploadResponse.Key,
      client_description: clientDescription || null,
      status: 'unreviewed',
    })
    .eq('id', submissionId)
    .select('id, trainer_id, trainers_details (profile_name)')
    .single();

  if (updateSubmissionError || !submission || !submission.trainers_details?.profile_name) throw new Error();

  const trainer = await getUserAsAdminById(submission.trainer_id);

  await sendMail({
    to: trainer.email,
    subject: `Pojawiło się nowe zgłoszenie - ${Constants.APP_NAME}`,
    html: render(
      <MailTemplate title="Pojawiło się nowe zgłoszenie.">
        <RequirementsSentMailContent
          submissionId={submission.id}
          trainerName={submission.trainers_details.profile_name}
        />
      </MailTemplate>,
    ),
  });

  revalidatePath('/submissions');

  redirect(`/submissions/${submissionId}`);
};

export default actionCompleteUploadAndSendRequirements;
