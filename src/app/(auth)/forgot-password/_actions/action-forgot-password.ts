'use server';

import { headers } from 'next/headers';
import { forgotPasswordFormSchema } from '@/app/(auth)/forgot-password/_utils';
import { getResponse } from '@/utils';
import Constants from '@/utils/constants';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { SearchParam } from '@/utils/types';

const actionForgotPassword = async (
  prevState: FormState,
  payload: { data: FormData; redirectUrlParam: SearchParam },
) => {
  const headersList = headers();
  const { data, redirectUrlParam } = payload;

  const redirectUrl = typeof redirectUrlParam === 'string' ? `?redirectUrl=${redirectUrlParam}` : '';

  const formSchemaParsed = forgotPasswordFormSchema.safeParse({ email: data.get('email') });

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(formSchemaParsed.data.email, {
    redirectTo: `${headersList.get('origin')}/auth/password-reset${redirectUrl}`,
  });

  if (!error)
    return getResponse('Właśnie wysłaliśmy Ci link do resetu hasła. Zerknij na swoją pocztę i zresetuj hasło.', true);

  return getResponse(Constants.COMMON_ERROR_MESSAGE);
};

export default actionForgotPassword;
