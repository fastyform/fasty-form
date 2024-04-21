'use server';

import { getTranslations } from 'next-intl/server';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { updatePasswordSchema } from './utils';

const actionUpdatePassword = async (prevState: FormState, data: FormData) => {
  const t = await getTranslations();
  const formSchemaParsed = updatePasswordSchema.safeParse({ password: data.get('password') });

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient();

  const { error } = await supabase.auth.updateUser({ password: formSchemaParsed.data.password });
  if (error?.message === 'New password should be different from the old password.')
    return getResponse(t('SETTINGS_PASSWORD_ERROR_SAME_PASSWORD'));

  if (!error) return getResponse(t('SETTINGS_PASSWORD_SUCCESS'), true);

  return getResponse(t('COMMON_ERROR'));
};

export default actionUpdatePassword;
