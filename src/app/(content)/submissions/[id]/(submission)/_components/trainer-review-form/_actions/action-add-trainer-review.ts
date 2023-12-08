'use server';

import { revalidatePath } from 'next/cache';
import { trainerReviewFormSchema } from '@/app/(content)/submissions/[id]/(submission)/_components/trainer-review-form/_utils';
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

  const { error } = await supabase
    .from('submissions')
    .update({ trainer_review: trainerReview })
    .eq('id', payload.submissionId);

  if (!error) {
    revalidatePath(`/submissions/${payload.submissionId}`);
    revalidatePath('/submissions');

    return { message: '' };
  }

  return { message: 'Wystąpił błąd podczas zapisywania oceny, spróbuj ponownie, lub skontaktuj się z nami.' };
};

export default actionAddTrainerReview;
