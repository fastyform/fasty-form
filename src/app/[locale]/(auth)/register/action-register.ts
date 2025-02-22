'use server';

import { getTranslations } from 'next-intl/server';
import { getConfirmSignupEmailTranslations, registerSchema } from '@/app/[locale]/(auth)/utils';
import { getResponse } from '@/utils';
import Constants, { Locale } from '@/utils/constants';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { Database } from '@/utils/supabase/supabase';
import { SearchParam } from '@/utils/types';

interface Payload {
  data: FormData;
  role: Database['public']['Enums']['role'];
  redirectPathParam: SearchParam;
  locale: Locale;
}

const actionRegister = async (prevState: FormState, { data: formData, role, redirectPathParam, locale }: Payload) => {
  const t = await getTranslations();
  const redirectPath = typeof redirectPathParam === 'string' ? redirectPathParam : '';

  const formSchemaParsed = registerSchema(t).safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!formSchemaParsed.success || !role) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { email, password } = formSchemaParsed.data;

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${Constants.ORIGIN_URL}${redirectPath}`,
      data: getConfirmSignupEmailTranslations(t),
    },
  });

  if (data.user?.identities?.length === 0) {
    return getResponse(t('REGISTER_ERROR_MAIL_TAKEN'));
  }

  if (error?.status === 429) {
    return getResponse(t('REGISTER_TOO_MANY_TRIES'));
  }

  if (error || !data || !data.user) {
    return getResponse(t('COMMON_ERROR'));
  }

  await supabase.from('user_data').update({ role, locale }).eq('user_id', data.user.id);

  return getResponse(t('REGISTER_SUCCESS'), true);
};

export default actionRegister;
