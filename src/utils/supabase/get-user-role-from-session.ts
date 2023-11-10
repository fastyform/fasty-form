'use server';

import getSupabase from './get-supabase';
import { Database } from './supabase';

const supabase = getSupabase();

const getUserRoleFromSession = async (): Promise<Database['public']['Enums']['user_type']> =>
  (await supabase.auth.getSession()).data.session?.user.user_metadata?.role;

export default getUserRoleFromSession;
