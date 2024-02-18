'use server';

import { revalidatePath } from 'next/cache';
import getUserFromSession from '@/utils/get-user-from-session';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionUpdateNotifications = async (optional_notifications: boolean) => {
  const supabase = getSupabaseServerClient();

  const user = await getUserFromSession();

  const { error } = await supabase.from('roles').update({ optional_notifications }).eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/settings/notifications');
};

export default actionUpdateNotifications;
