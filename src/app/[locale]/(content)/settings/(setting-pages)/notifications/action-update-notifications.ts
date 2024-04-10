'use server';

import { revalidatePath } from 'next/cache';
import getLoggedInUser from '@/utils/get-logged-in-user';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionUpdateNotifications = async (marketing_consent: boolean) => {
  const supabase = getSupabaseServerClient();

  const user = await getLoggedInUser();

  const { error } = await supabase.from('roles').update({ marketing_consent }).eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/settings/notifications');
};

export default actionUpdateNotifications;
