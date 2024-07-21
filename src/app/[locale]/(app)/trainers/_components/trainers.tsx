import { getSupabaseServerClient } from '@/utils/supabase/client';
import TrainerCard, { TrainerCardContainer } from './trainer-card';

const Trainers = async () => {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from('trainers_details')
    .select('service_price_in_grosz, profile_name, profile_image_url, profile_slug, user_id')
    .filter('stripe_onboarding_status', 'eq', 'verified')
    .filter('hide_profile', 'eq', false);

  if (error) throw new Error();

  return (
    <TrainerCardContainer>
      {data.map((trainer) => (
        <TrainerCard key={trainer.user_id} trainer={trainer} />
      ))}
    </TrainerCardContainer>
  );
};

export default Trainers;
