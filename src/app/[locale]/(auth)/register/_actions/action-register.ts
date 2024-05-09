'use server';

import { getTranslations } from 'next-intl/server';
import { registerSchema } from '@/app/[locale]/(auth)/_utils';
import { getResponse } from '@/utils';
import Constants from '@/utils/constants';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { Database } from '@/utils/supabase/supabase';
import { SearchParam } from '@/utils/types';

interface Payload {
  data: FormData;
  role: Database['public']['Enums']['role'];
  redirectPathParam: SearchParam;
}

const actionRegister = async (prevState: FormState, { data: formData, role, redirectPathParam }: Payload) => {
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
    options: { emailRedirectTo: `${Constants.ORIGIN_URL}${redirectPath}` },
  });

  if (data.user?.identities?.length === 0) {
    return getResponse('Istnieje już konto o podanym adresie email.');
  }

  if (error?.status === 429) {
    return getResponse('Zbyt wiele prób rejestracji w krótkim czasie.');
  }

  if (error || !data || !data.user) {
    return getResponse(Constants.COMMON_ERROR_MESSAGE);
  }

  await supabase.from('roles').update({ role }).eq('user_id', data.user.id);

  return getResponse('Rejestracja zakończona! Sprawdź swój email, aby aktywować konto.', true);
};

export default actionRegister;
