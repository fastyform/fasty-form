'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getResponse } from '@/utils';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { Database } from '@/utils/supabase/supabase';

const actionRegisterGoogle = async (role: Database['public']['Enums']['role']) => {
  if (!role) {
    return getResponse('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.');
  }

  const headersList = headers();

  const supabase = getSupabaseServerClient();

  const response = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${headersList.get('origin')}/providers/google/register?role=${role}` },
  });

  if (!response.error) {
    return redirect(response.data.url) as undefined;
  }

  return getResponse('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.');
};

export default actionRegisterGoogle;
