import { getSupabaseServerComponentClient } from '@/utils/supabase/client';

const getSubmissionById = async (submissionId: string) => {
  const supabase = getSupabaseServerComponentClient();

  const { data: submission, error } = await supabase
    .from('submissions')
    .select(
      'status, trainers_details (profile_name), updated_at, video_key, client_description, trainer_review, trainer_id',
    )
    .eq('id', submissionId)
    .single();

  if (!submission || error) throw new Error();

  return submission;
};

export default getSubmissionById;
