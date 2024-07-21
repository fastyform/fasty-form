import { SocialLinks } from '@/app/[locale]/(app)/trainers/[slug]/_utils/utils';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { Database } from './supabase/supabase';

export type TrainerDetails = Database['public']['Tables']['trainers_details']['Row'] & { social_links: SocialLinks };

const getTrainerDetailsById = async (trainerId: string): Promise<TrainerDetails> => {
  const supabase = getSupabaseServerClient();

  const { data: trainerDetails, error } = await supabase
    .from('trainers_details')
    .select('*')
    .eq('user_id', trainerId)
    .single();
  if (!trainerDetails || error) throw new Error();

  return trainerDetails as TrainerDetails;
};

export default getTrainerDetailsById;
