'use server';

import { updatePasswordSchema } from '@/app/(content)/settings/(setting-pages)/update-password/utils';
import { getResponse } from '@/utils';
import Constants from '@/utils/constants';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionUpdatePassword = async (prevState: FormState, data: FormData) => {
  const formSchemaParsed = updatePasswordSchema.safeParse({ password: data.get('password') });

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient();

  const { error } = await supabase.auth.updateUser({ password: formSchemaParsed.data.password });
  if (error?.message === 'New password should be different from the old password.')
    return getResponse('Hasło nie może być takie jak poprzednie.');

  if (!error) return getResponse('Twoje hasło zostało zmienione.', true);

  return getResponse(Constants.COMMON_ERROR_MESSAGE);
};

export default actionUpdatePassword;
