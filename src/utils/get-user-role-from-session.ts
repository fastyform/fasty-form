import { getSupabaseServerComponentClient } from './supabase/client';

const getUserRoleFromSession = async () => {
  const supabase = getSupabaseServerComponentClient();

  return (await supabase.auth.getSession()).data.session?.user.user_metadata?.role;
};

export default getUserRoleFromSession;
