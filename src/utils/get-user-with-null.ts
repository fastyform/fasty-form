import { getSupabaseServerComponentClient } from './supabase/client';

const getUserWithNull = async () => {
  const supabase = getSupabaseServerComponentClient();
  const { data: session, error } = await supabase.auth.getSession();
  if (error) throw new Error();

  return session.session ? session.session.user : null;
};

export default getUserWithNull;
