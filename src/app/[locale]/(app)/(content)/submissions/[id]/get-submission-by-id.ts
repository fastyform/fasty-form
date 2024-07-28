import { getSupabaseServerClient } from '@/utils/supabase/client';

const getSubmissionById = async (submissionId: string) => {
  const supabase = getSupabaseServerClient();

  const { data: submission, error } = await supabase
    .from('submissions')
    .select(
      'status, trainers_details (profile_name, profile_slug,profile_image_url), video_key, client_description, trainer_review, trainer_id, reviewed_at, paidout_at, created_at',
    )
    .eq('id', submissionId)
    .single();

  if (!submission || error) throw new Error();

  return submission;
};

export default getSubmissionById;
