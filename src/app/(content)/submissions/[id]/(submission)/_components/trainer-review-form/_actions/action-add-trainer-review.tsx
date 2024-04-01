'use server';

import { render } from '@react-email/render';
import { revalidatePath } from 'next/cache';
import { trainerReviewFormSchema } from '@/app/(content)/submissions/[id]/(submission)/_components/trainer-review-form/_utils';
import getUserAsAdminById from '@/app/(content)/submissions/_utils/get-user-as-admin-by-id';
import AddedReview from '@/emails/added-review';
import Constants from '@/utils/constants';
import { sendMail } from '@/utils/sendgrid';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionAddTrainerReview = async (
  prevState: { message: string },
  payload: { data: FormData; submissionId: string },
) => {
  const supabase = getSupabaseServerClient();

  const formSchemaParsed = trainerReviewFormSchema.safeParse({ trainerReview: payload.data.get('trainerReview') });

  if (!formSchemaParsed.success) {
    return { message: 'Bad request.' };
  }

  const { trainerReview } = formSchemaParsed.data;

  const { data: submission, error } = await supabase
    .from('submissions')
    .update({ trainer_review: trainerReview, status: 'reviewed' })
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
      subject: `${submission.trainers_details.profile_name} - przeanalizował twoje wideo`,
      html: render(
        <AddedReview
          profileName={submission.trainers_details.profile_name}
          submissionId={payload.submissionId}
          trainerProfileSlug={submission.trainers_details.profile_slug}
        />,
      ),
    });

    return { message: '' };
  }

  return {
    message: Constants.COMMON_ERROR_MESSAGE,
  };
};

export default actionAddTrainerReview;
