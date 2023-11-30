import { getSupabaseServerComponentClient } from './supabase/client';

const getUserFromSession = async () => {
  const supabase = getSupabaseServerComponentClient();
  const { data: session, error } = await supabase.auth.getSession();
  if (error || !session.session) throw new Error();

  return session.session.user;
};

export default getUserFromSession;
