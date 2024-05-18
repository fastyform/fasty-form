'use server';

import { CompletedPart, CompleteMultipartUploadCommand, CompleteMultipartUploadRequest } from '@aws-sdk/client-s3';
import { render } from '@react-email/render';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { submissionRequirementsSchema } from '@/app/[locale]/(content)/submissions/[id]/requirements/utils';
import getUserAsAdminById from '@/app/[locale]/(content)/submissions/_utils/get-user-as-admin-by-id';
import RequirementsSent from '@/emails/requirements-sent';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getUserLocaleAsAdminById from '@/utils/get-user-locale-by-id';
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

const sendTrainerEmailNotification = async (trainerId: string, profileName: string, submissionId: string) => {
  const trainer = await getUserAsAdminById(trainerId);
  const locale = await getUserLocaleAsAdminById(trainer.id);
  const t = await getTranslations({ locale });

  await sendMail({
    to: trainer.email as string,
    subject: t('MAIL_TEMPLATE_REQUIREMENTS_SENT_SUBJECT'),
    html: render(<RequirementsSent submissionId={submissionId} t={t} trainerName={profileName} />),
  });
};

const actionCompleteUploadAndSendRequirements = async (payload: Payload) => {
  const { videoKey, uploadId, parts, submissionId, clientDescription } = payload;
  const t = await getTranslations();

  submissionRequirementsSchema(t).parse({ clientDescription });
  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) throw new Error();

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

  await sendTrainerEmailNotification(submission.trainer_id, submission.trainers_details.profile_name, submissionId);

  revalidatePath('/submissions');

  redirect(`/submissions/${submissionId}`);
};

export default actionCompleteUploadAndSendRequirements;
