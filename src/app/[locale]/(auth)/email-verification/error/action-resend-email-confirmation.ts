'use server';

import { getTranslations } from 'next-intl/server';
import { formSchema } from '@/app/[locale]/(auth)/email-verification/error/utils';
import { getResponse } from '@/utils';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionResendEmailConfirmation = async (prevState: { message: string; isSuccess: boolean }, data: FormData) => {
  const t = await getTranslations();
  const formSchemaParsed = formSchema(t).safeParse({ email: data.get('email') });

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { email } = formSchemaParsed.data;

  const { error } = await supabase.auth.resend({ type: 'signup', email });

  if (!error) {
    return getResponse(t('EMAIL_CONFIRMATION_RESPONSE_SUCCESS'), true);
  }

  if (error.status === 429) {
    return getResponse(t('EMAIL_CONFIRMATION_RESPONSE_ERROR'));
  }

  return getResponse(t('COMMON_ERROR'));
};

export default actionResendEmailConfirmation;
