import { notFound } from 'next/navigation';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const getTrainerDetailsBySlug = async (trainerProfileSlug: string) => {
  const supabase = getSupabaseServerClient();

  const { data: trainerDetails, error } = await supabase
    .from('trainers_details')
    .select('user_id, service_price_in_grosz')
    .eq('profile_slug', trainerProfileSlug)
    .single();

  if (!trainerDetails) {
    notFound();
  }

  if (error) throw new Error();

  return trainerDetails;
};

export default getTrainerDetailsBySlug;
