'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getResponse } from '@/utils';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { Database } from '@/utils/supabase/supabase';
import { SearchParam } from '@/utils/types';

const actionRegisterGoogle = async (role: Database['public']['Enums']['role'], redirectUrlParam: SearchParam) => {
  const redirectUrl = typeof redirectUrlParam === 'string' ? `&redirectUrl=${redirectUrlParam}` : '';

  if (!role) {
    return getResponse('Hmm, napotkaliśmy nieoczekiwany błąd. Daj nam chwilę i spróbuj ponownie za jakiś czas.');
  }

  const headersList = headers();

  const supabase = getSupabaseServerClient();

  const response = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${headersList.get('origin')}/providers/google/register?role=${role}${redirectUrl}` },
  });

  if (!response.error) {
    return redirect(response.data.url) as undefined;
  }

  return getResponse('Hmm, napotkaliśmy nieoczekiwany błąd. Daj nam chwilę i spróbuj ponownie za jakiś czas.');
};

export default actionRegisterGoogle;
