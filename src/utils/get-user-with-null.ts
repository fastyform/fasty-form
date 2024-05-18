import 'server-only';

import { getSupabaseServerClient } from './supabase/client';

const getUserWithNull = async () => {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  return data.user;
};

export default getUserWithNull;
