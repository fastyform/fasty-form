import { getSupabaseServerClient } from './supabase/client';

const checkIsTrainerAccount = async (userId: string) => {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase.from('user_data').select('role').eq('user_id', userId).single();
  if (!data || error) throw new Error();

  return data.role === 'trainer';
};

export default checkIsTrainerAccount;
