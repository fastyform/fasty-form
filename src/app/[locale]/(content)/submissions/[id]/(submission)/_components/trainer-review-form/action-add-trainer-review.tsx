'use server';

import { render } from '@react-email/render';
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import getUserAsAdminById from '@/app/[locale]/(content)/submissions/_utils/get-user-as-admin-by-id';
import AddedReview from '@/emails/added-review';
import { sendMail } from '@/utils/sendgrid';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { trainerReviewFormSchema } from './utils';

const actionAddTrainerReview = async (
  prevState: { message: string },
  payload: { data: FormData; submissionId: string },
) => {
  const supabase = getSupabaseServerClient();
  const t = await getTranslations({ locale: 'pl' });
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

    const user = await getUserAsAdminById(submission.client_id);
    sendMail({
      to: user.email as string,
      subject: t('MAIL_TEMPLATE_ADDED_REVIEW_SUBJECT', { profileName: submission.trainers_details.profile_name }),
      html: render(
        <AddedReview
          profileName={submission.trainers_details.profile_name}
          submissionId={payload.submissionId}
          t={t}
          trainerProfileSlug={submission.trainers_details.profile_slug}
        />,
      ),
    });

    return { message: '' };
  }

  return {
    message: t('COMMON_ERROR'),
  };
};

export default actionAddTrainerReview;
