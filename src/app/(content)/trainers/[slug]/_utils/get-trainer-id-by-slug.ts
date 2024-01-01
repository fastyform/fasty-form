import { notFound } from 'next/navigation';
import { getSupabaseServerComponentClient } from '@/utils/supabase/client';

const getTrainerIdBySlug = async (trainerProfileSlug: string) => {
  const supabase = getSupabaseServerComponentClient();

  const { data: trainerDetails, error } = await supabase
    .from('trainers_details')
    .select('user_id')
    .eq('profile_slug', trainerProfileSlug)
    .single();

  if (!trainerDetails) {
    notFound();
  }

  if (error) throw new Error();

  return trainerDetails;
};

export default getTrainerIdBySlug;
