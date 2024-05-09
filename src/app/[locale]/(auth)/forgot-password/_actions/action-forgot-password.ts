'use server';

import { getTranslations } from 'next-intl/server';
import { forgotPasswordFormSchema } from '@/app/[locale]/(auth)/forgot-password/_utils';
import { getResponse } from '@/utils';
import Constants from '@/utils/constants';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { SearchParam } from '@/utils/types';

const actionForgotPassword = async (
  prevState: FormState,
  payload: { data: FormData; redirectPathParam: SearchParam },
) => {
  const t = await getTranslations();
  const { data, redirectPathParam } = payload;

  const redirectPath = typeof redirectPathParam === 'string' ? redirectPathParam : '';

  const formSchemaParsed = forgotPasswordFormSchema(t).safeParse({ email: data.get('email') });

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(formSchemaParsed.data.email, {
    redirectTo: `${Constants.ORIGIN_URL}${redirectPath}`,
  });

  if (!error)
    return getResponse('Właśnie wysłaliśmy Ci link do resetu hasła. Zerknij na swoją pocztę i zresetuj hasło.', true);

  return getResponse(Constants.COMMON_ERROR_MESSAGE);
};

export default actionForgotPassword;
