import { getSupabaseServerComponentClient } from '@/utils/supabase/client';
import { Database } from './supabase/supabase';

export type TrainerDetails = Omit<Database['public']['Tables']['trainers_details']['Row'], 'created_at' | 'user_id'>;

const getTrainerDetailsById = async (trainerId: string): Promise<TrainerDetails> => {
  const supabase = getSupabaseServerComponentClient();

  const { data: trainerDetails, error } = await supabase
    .from('trainers_details')
    .select(
      'profile_name, profile_image_url, is_onboarded, service_price_in_grosz, stripe_account_id, stripe_onboarding_status, stripe_price_id, profile_slug',
    )
    .eq('user_id', trainerId)
    .single();
  if (!trainerDetails || error) throw new Error();

  return trainerDetails;
};

export default getTrainerDetailsById;
