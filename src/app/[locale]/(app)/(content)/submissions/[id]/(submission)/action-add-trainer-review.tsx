'use server';

import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import { trainerReviewFormSchema } from '@/app/[locale]/(app)/(content)/submissions/[id]/(submission)/_utils/schema';
import { sendNotificationsToClient } from '@/app/[locale]/(app)/(content)/submissions/[id]/(submission)/_utils/send-notifications-to-client';
import { getSupabaseServerClient } from '@/utils/supabase/client';

interface Payload {
  trainerReview: string;
  submissionId: string;
}

const actionAddTrainerReview = async ({ trainerReview, submissionId }: Payload) => {
  const supabase = getSupabaseServerClient();
  const t = await getTranslations();
  trainerReviewFormSchema(t).parse({ trainerReview });

  const { data, error } = await supabase
    .from('submissions')
    .update({ trainer_review: trainerReview, status: 'reviewed', reviewed_at: dayjs().toISOString() })
    .eq('id', submissionId)
    .select('trainers_details (profile_name, profile_slug), client_id')
    .single();

  if (
    error ||
    !data ||
    !data.trainers_details ||
    !data.client_id ||
    !data.trainers_details.profile_slug ||
    !data.trainers_details.profile_name
  ) {
    throw new Error();
  }

  await sendNotificationsToClient({
    client_id: data.client_id,
    profile_name: data.trainers_details.profile_name,
    profile_slug: data.trainers_details.profile_slug,
    submissionId,
  });

  revalidatePath(`/submissions/${submissionId}`);
  revalidatePath('/submissions');
};

export default actionAddTrainerReview;
