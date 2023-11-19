import { getSupabaseServerComponentClient } from './supabase/client';

export const getUserRoleFromSession = async () => {
  const supabase = getSupabaseServerComponentClient();

  return (await supabase.auth.getSession()).data.session?.user.user_metadata?.role;
};

export const getUserProviderFromSession = async () => {
  const supabase = getSupabaseServerComponentClient();

  return (await supabase.auth.getSession()).data.session?.user.app_metadata.provider;
};
