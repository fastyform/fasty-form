'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getResponse } from '@/utils';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionLoginGoogle = async () => {
  const headersList = headers();
  const supabase = getSupabaseServerClient();

  const response = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${headersList.get('origin')}/providers/google/login` },
  });

  if (!response.error) {
    return redirect(response.data.url) as undefined;
  }

  return getResponse('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.');
};

export default actionLoginGoogle;
