import { getSupabaseServerClient } from '@/utils/supabase/client';
import { Database } from './supabase/supabase';

export type TrainerDetails = Omit<
  Database['public']['Tables']['trainers_details']['Row'],
  'created_at' | 'user_id' | 'email' | 'onboarded_at' | 'social_links' | 'app_review_sent_at'
>;

const getTrainerDetailsById = async (trainerId: string): Promise<TrainerDetails> => {
  const supabase = getSupabaseServerClient();

  const { data: trainerDetails, error } = await supabase
    .from('trainers_details')
    .select(
      'profile_name, profile_image_url, is_onboarded, service_price_in_grosz, stripe_account_id, stripe_onboarding_status, stripe_price_id, profile_slug, bio, hide_profile',
    )
    .eq('user_id', trainerId)
    .single();
  if (!trainerDetails || error) throw new Error();

  return trainerDetails;
};

export default getTrainerDetailsById;
