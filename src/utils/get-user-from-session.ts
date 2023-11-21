import { getSupabaseServerComponentClient } from './supabase/client';

const getUserFromSession = async () => {
  const supabase = getSupabaseServerComponentClient();
  const { data: session } = await supabase.auth.getSession();
  if (!session.session?.user) throw new Error();

  return session.session.user;
};

export default getUserFromSession;
