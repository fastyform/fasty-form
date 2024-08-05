'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getResponse } from '@/utils';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { SearchParam } from '@/utils/types';

// NOTE: in this flow
// if there is no account - creates a new account with client role
// if there is account - log in

const actionSignInGoogle = async (redirectUrlParam: SearchParam) => {
  const t = await getTranslations();
  const redirectUrl = typeof redirectUrlParam === 'string' ? `&redirectUrl=${redirectUrlParam}` : '';
  const locale = await getLocale();

  const headersList = headers();

  const supabase = getSupabaseServerClient();

  const response = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${headersList.get('origin')}/api/auth/providers/google/sign-in?locale=${locale}${redirectUrl}`,
    },
  });

  if (!response.error) {
    return redirect(response.data.url) as undefined;
  }

  return getResponse(t('COMMON_ERROR'));
};

export default actionSignInGoogle;
