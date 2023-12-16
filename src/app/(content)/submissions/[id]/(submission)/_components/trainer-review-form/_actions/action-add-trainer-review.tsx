'use server';

import { render } from '@react-email/render';
import { revalidatePath } from 'next/cache';
import AddReviewMailContent from '@/app/(content)/submissions/[id]/(submission)/_components/trainer-review-form/_components/add-review-mail-conent';
import { trainerReviewFormSchema } from '@/app/(content)/submissions/[id]/(submission)/_components/trainer-review-form/_utils';
import Constants from '@/utils/constants';
import MailTemplate from '@/utils/mail/mail-template';
import sendMail from '@/utils/mail/send-mail';
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
    .select('client_email, trainers_details (profile_name), trainer_id')
    .single();

  if (!error && submission && submission.client_email && submission.trainers_details && submission.trainer_id) {
    revalidatePath(`/submissions/${payload.submissionId}`);
    revalidatePath('/submissions');

    await sendMail({
      to: submission.client_email,
      subject: 'Trener przeanalizował twoje wideo',
      html: render(
        <MailTemplate title="Twoja Analiza Wideo Jest Gotowa! Sprawdź, odpowiedź trenera.">
          <AddReviewMailContent
            profileName={submission.trainers_details.profile_name}
            submissionId={payload.submissionId}
            trainerId={submission.trainer_id}
          />
        </MailTemplate>,
      ),
    });

    return { message: '' };
  }

  return {
    message: Constants.COMMON_ERROR_MESSAGE,
  };
};

export default actionAddTrainerReview;
