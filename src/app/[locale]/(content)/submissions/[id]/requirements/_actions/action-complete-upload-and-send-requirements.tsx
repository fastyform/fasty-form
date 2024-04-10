'use server';

import { CompletedPart, CompleteMultipartUploadCommand, CompleteMultipartUploadRequest } from '@aws-sdk/client-s3';
import { render } from '@react-email/render';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { submissionRequirementsSchema } from '@/app/[locale]/(content)/submissions/[id]/requirements/_utils';
import getUserAsAdminById from '@/app/[locale]/(content)/submissions/_utils/get-user-as-admin-by-id';
import RequirementsSent from '@/emails/requirements-sent';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getLoggedInUser from '@/utils/get-logged-in-user';
import s3Client, { BUCKET_NAME_UNPROCESSED } from '@/utils/s3';
import { sendMail } from '@/utils/sendgrid';
import { getSupabaseServerClient } from '@/utils/supabase/client';

interface Payload {
  videoKey: string;
  uploadId: CompleteMultipartUploadRequest['UploadId'];
  parts: CompletedPart[];
  submissionId: string;
  clientDescription: string;
}

const actionCompleteUploadAndSendRequirements = async (payload: Payload) => {
  const { videoKey, uploadId, parts, submissionId, clientDescription } = payload;

  submissionRequirementsSchema.parse({ clientDescription });
  const supabase = getSupabaseServerClient();
  const user = await getLoggedInUser();

  const isTrainerAccount = await checkIsTrainerAccount(user.id);

  if (isTrainerAccount) {
    throw new Error('Trainer account cannot upload videos');
  }

  const completeMultipartUploadResponse = await s3Client.send(
    new CompleteMultipartUploadCommand({
      Bucket: BUCKET_NAME_UNPROCESSED,
      Key: videoKey,
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

  sendMail({
    to: trainer.email as string,
    subject: 'Pojawiło się nowe zgłoszenie',
    html: render(
      <RequirementsSent submissionId={submission.id} trainerName={submission.trainers_details.profile_name} />,
    ),
  });

  revalidatePath('/submissions');

  redirect(`/submissions/${submissionId}`);
};

export default actionCompleteUploadAndSendRequirements;
