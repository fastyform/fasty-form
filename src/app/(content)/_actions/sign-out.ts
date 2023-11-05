'use server';

import { redirect } from 'next/navigation';
import getSupabase from '@/utils/get-supabase';

const signOut = async () => {
  const supabase = getSupabase();

  await supabase.auth.signOut();
  console.log('here');
  redirect('/login');
};

export default signOut;
