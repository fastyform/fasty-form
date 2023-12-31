import { getSupabaseServerComponentClient } from '@/utils/supabase/client';

const getTrainerDetailsBySlug = async (trainerProfileSlug: string) => {
  const supabase = getSupabaseServerComponentClient();

  const { data: trainerDetails, error } = await supabase
    .from('trainers_details')
    .select(
      'profile_name, profile_image_url, is_onboarded, service_price, stripe_account_id, is_onboarded_stripe, stripe_price_id, user_id',
    )
    .eq('profile_slug', trainerProfileSlug)
    .single();

  if (!trainerDetails || error) throw new Error();

  return trainerDetails;
};

export default getTrainerDetailsBySlug;
