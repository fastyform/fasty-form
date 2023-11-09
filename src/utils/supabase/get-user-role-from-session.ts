import getSupabase from './get-supabase';

const supabase = getSupabase();

const getUserRoleFromSession = async () => (await supabase.auth.getSession()).data.session?.user.user_metadata?.role;

export default getUserRoleFromSession;
