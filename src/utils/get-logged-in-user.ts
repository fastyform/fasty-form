import { getSupabaseServerComponentClient } from './supabase/client';

const getLoggedInUser = async () => {
  const supabase = getSupabaseServerComponentClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error();

  return data.user;
};

export default getLoggedInUser;
