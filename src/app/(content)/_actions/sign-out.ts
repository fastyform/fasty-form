'use server';

import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const signOut = async () => {
  const supabase = getSupabaseServerClient();

  await supabase.auth.signOut();

  redirect('/login');
};

export default signOut;
