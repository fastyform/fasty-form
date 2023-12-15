import { getSupabaseServerComponentClient } from '@/utils/supabase/client';

const getSubmissionById = async (submissionId: string) => {
  const supabase = getSupabaseServerComponentClient();

  const { data: submission, error } = await supabase
    .from('submissions')
    .select(
      'status, thumbnail_url, trainers_details (profile_name), updated_at, video_url, client_description, trainer_review, trainer_id',
    )
    .eq('id', submissionId)
    .single();

  if (!submission || error) throw new Error();

  return submission;
};

export default getSubmissionById;
