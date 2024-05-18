'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getResponse } from '@/utils';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { Database } from '@/utils/supabase/supabase';
import { SearchParam } from '@/utils/types';

const actionRegisterGoogle = async (role: Database['public']['Enums']['role'], redirectUrlParam: SearchParam) => {
  const t = await getTranslations();
  const redirectUrl = typeof redirectUrlParam === 'string' ? `&redirectUrl=${redirectUrlParam}` : '';
  const locale = await getLocale();

  if (!role) {
    return getResponse(t('COMMON_ERROR'));
  }

  const headersList = headers();

  const supabase = getSupabaseServerClient();

  const response = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${headersList.get('origin')}/api/auth/providers/google/register?role=${role}&locale=${locale}${redirectUrl}`,
    },
  });

  if (!response.error) {
    return redirect(response.data.url) as undefined;
  }

  return getResponse(t('COMMON_ERROR'));
};

export default actionRegisterGoogle;
