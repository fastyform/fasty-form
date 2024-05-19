'use server';

import { render } from '@react-email/render';
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import getUserAsAdminById from '@/app/[locale]/(content)/submissions/_utils/get-user-as-admin-by-id';
import AddedReview from '@/emails/added-review';
import getUserLocaleAsAdminById from '@/utils/get-user-locale-by-id';
import { sendMail } from '@/utils/sendgrid';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { trainerReviewFormSchema } from './utils';

interface SubmissionData {
  clientId: string;
  trainerProfileName: string | null;
  submissionId: string;
  trainerProfileSlug: string;
}

const sendAddedReviewNotificationToClient = async ({
  clientId,
  trainerProfileName,
  submissionId,
  trainerProfileSlug,
}: SubmissionData) => {
  const [user, locale] = await Promise.all([getUserAsAdminById(clientId), getUserLocaleAsAdminById(clientId)]);

  const t = await getTranslations({ locale });

  await sendMail({
    to: user.email as string,
    subject: t('MAIL_TEMPLATE_ADDED_REVIEW_SUBJECT', { profileName: trainerProfileName }),
    html: render(
      <AddedReview
        profileName={trainerProfileName}
        submissionId={submissionId}
        t={t}
        trainerProfileSlug={trainerProfileSlug}
      />,
    ),
  });
};

const actionAddTrainerReview = async (
  prevState: { message: string },
  payload: { data: FormData; submissionId: string },
) => {
  const supabase = getSupabaseServerClient();
  const t = await getTranslations();
  const formSchemaParsed = trainerReviewFormSchema(t).safeParse({ trainerReview: payload.data.get('trainerReview') });

  if (!formSchemaParsed.success) {
    return { message: 'Bad request.' };
  }

  const { trainerReview } = formSchemaParsed.data;

  const { data: submission, error } = await supabase
    .from('submissions')
    .update({ trainer_review: trainerReview, status: 'reviewed', reviewed_at: dayjs().toISOString() })
    .eq('id', payload.submissionId)
    .select('trainers_details (profile_name, profile_slug), client_id')
    .single();

  if (
    !error &&
    submission &&
    submission.trainers_details &&
    submission.client_id &&
    submission.trainers_details.profile_slug
  ) {
    revalidatePath(`/submissions/${payload.submissionId}`);
    revalidatePath('/submissions');

    await sendAddedReviewNotificationToClient({
      clientId: submission.client_id,
      submissionId: payload.submissionId,
      trainerProfileName: submission.trainers_details.profile_name,
      trainerProfileSlug: submission.trainers_details.profile_slug,
    });

    return { message: '' };
  }

  // NOTE: THIS IS WHEN USER DELETES AN ACCOUNT
  if (!submission?.client_id) return { message: '' };

  return {
    message: t('COMMON_ERROR'),
  };
};

export default actionAddTrainerReview;
