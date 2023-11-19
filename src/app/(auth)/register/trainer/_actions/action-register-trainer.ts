'use server';

import { headers } from 'next/headers';
import { formSchema } from '@/app/(auth)/register/trainer/_utils';
import { getResponse } from '@/utils';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionRegisterTrainer = async (prevState: { message: string; isSuccess: boolean }, data: FormData) => {
  const headersList = headers();

  const formSchemaParsed = formSchema.safeParse({
    service_cost: parseInt(`${data.get('service_cost')}`, 10),
    profile_name: data.get('profile_name'),
    email: data.get('email'),
    password: data.get('password'),
    policy: data.get('policy') === 'true',
  });

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient();

  const { email, password } = formSchemaParsed.data;

  const response = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${headersList.get('origin')}/auth/callback`, data: { role: 'trainer' } },
  });

  if (response.data.user?.identities?.length === 0) {
    return getResponse('Istnieje już konto o podanym adresie email.');
  }

  if (response.error?.status === 429) {
    return getResponse('Zbyt wiele prób rejestracji w krótkim czasie.');
  }

  if (response.error) {
    return getResponse('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.');
  }

  return getResponse('Rejestracja zakończona! Sprawdź swój email, aby aktywować konto.', true);
};

export default actionRegisterTrainer;
