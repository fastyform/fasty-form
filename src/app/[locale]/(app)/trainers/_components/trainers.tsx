import { getSupabaseServerClient } from '@/utils/supabase/client';
import { SearchParams } from '@/utils/types';
import InfiniteTrainers from './infinite-trainers';

const generateRandomSeed = () => Math.random().toString(36).substring(2, 15);

const Trainers = async ({ searchParams }: { searchParams: SearchParams }) => {
  const supabase = getSupabaseServerClient();
  const seed = generateRandomSeed();

  const { data, error } = await supabase.rpc('fetch_trainers', {
    start: 0,
    stop: 17,
    seed,
    order_by:
      typeof searchParams.sort === 'string' && searchParams.sort !== 'null' ? 'service_price_in_grosz' : undefined,
    order_dir: typeof searchParams.sort === 'string' && searchParams.sort !== 'null' ? searchParams.sort : undefined,
  });

  console.log(error);
  if (error) throw new Error();

  return <InfiniteTrainers seed={seed} trainers={data} />;
};

export default Trainers;
