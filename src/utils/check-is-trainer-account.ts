import { getSupabaseServerComponentClient } from './supabase/client';

const checkIsTrainerAccount = async (userId: string) => {
  const supabase = getSupabaseServerComponentClient();

  const { data, error } = await supabase.from('roles').select('role').eq('user_id', userId).single();
  if (!data || error) throw new Error();

  return data.role === 'trainer';
};

export default checkIsTrainerAccount;
