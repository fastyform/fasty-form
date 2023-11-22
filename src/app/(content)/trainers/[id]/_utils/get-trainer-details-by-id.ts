import { getSupabaseServerComponentClient } from '@/utils/supabase/client';

const getTrainerDetailsById = async (trainerId: string) => {
  const supabase = getSupabaseServerComponentClient();

  const { data: trainerDetails, error } = await supabase
    .from('trainers_details')
    .select('profile_name, profile_image_url, is_onboarded, service_price')
    .eq('user_id', trainerId)
    .single();

  if (!trainerDetails || error) throw new Error();

  return trainerDetails;
};

export default getTrainerDetailsById;
