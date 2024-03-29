import 'server-only';

import { getSupabaseServerComponentClient } from './supabase/client';

const getUserWithNull = async () => {
  const supabase = getSupabaseServerComponentClient();
  const { data } = await supabase.auth.getUser();

  return data.user;
};

export default getUserWithNull;
