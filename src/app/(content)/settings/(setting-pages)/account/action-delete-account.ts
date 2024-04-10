'use server';

import { redirect } from 'next/navigation';
import getLoggedInUser from '@/utils/get-logged-in-user';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionDeleteAccount = async (userId: string) => {
  const { id } = await getLoggedInUser();
  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);

  if (id !== userId) throw new Error('Unauthorized');

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    throw new Error('Error deleting user');
  }

  redirect('/login');
};

export default actionDeleteAccount;
