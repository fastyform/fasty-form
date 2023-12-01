'use server';

import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionSignOut = async () => {
  const supabase = getSupabaseServerClient();

  await supabase.auth.signOut();

  redirect('/login');
};

export default actionSignOut;
