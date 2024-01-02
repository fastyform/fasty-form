import { getSupabaseServerComponentClient } from '@/utils/supabase/client';

const getTrainerDetailsById = async (trainerId: string) => {
  const supabase = getSupabaseServerComponentClient();

  const { data: trainerDetails, error } = await supabase
    .from('trainers_details')
    .select(
      'profile_name, profile_image_url, is_onboarded, service_price_in_grosz, stripe_account_id, is_onboarded_stripe, stripe_price_id, profile_slug',
    )
    .eq('user_id', trainerId)
    .single();
  if (!trainerDetails || error) throw new Error();

  return trainerDetails;
};

export default getTrainerDetailsById;
