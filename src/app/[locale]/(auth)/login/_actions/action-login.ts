'use server';

import { redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { formSchema } from '@/app/[locale]/(auth)/login/_utils';
import { getResponse } from '@/utils';
import { Locale } from '@/utils/constants';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { SearchParam } from '@/utils/types';

const actionLogin = async (prevState: FormState, payload: { data: FormData; redirectUrlParam: SearchParam }) => {
  const t = await getTranslations();
  const { data, redirectUrlParam: redirectUrl } = payload;
  const formSchemaParsed = formSchema(t).safeParse({ email: data.get('email'), password: data.get('password') });

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient();
  const { email, password } = formSchemaParsed.data;
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({ email, password });

  if (!error) {
    if (user) {
      const locale = (await getLocale()) as Locale;
      await supabase.from('user_data').update({ locale }).eq('user_id', user.id);
    }

    return redirect(typeof redirectUrl === 'string' ? redirectUrl : '/submissions');
  }

  if (error.message === 'Email not confirmed') {
    return getResponse(t('LOGIN_ACTION_NOT_CONFIRMED'));
  }

  if (error.message === 'Invalid login credentials') {
    return getResponse(t('LOGIN_ACTION_WRONG_EMAIL_OR_PASSWORD'));
  }

  return getResponse(t('COMMON_ERROR'));
};

export default actionLogin;
