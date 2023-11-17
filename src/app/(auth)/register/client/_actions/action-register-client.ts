'use server';

import { headers } from 'next/headers';
import { formSchema } from '@/app/(auth)/register/client/_utils';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const getResponse = (message: string, isSuccess = false) => ({ message, isSuccess });

const actionRegisterClient = async (prevState: { message: string; isSuccess: boolean }, data: FormData) => {
  const headersList = headers();

  const formSchemaParsed = formSchema.safeParse({
    email: data.get('email'),
    password: data.get('password'),
    policy: data.get('policy') === 'true',
  });

  if (!formSchemaParsed.success) {
    return { message: 'Bad request.', isSuccess: false };
  }

  const supabase = getSupabaseServerClient();

  const { email, password } = formSchemaParsed.data;

  const response = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${headersList.get('origin')}/auth/callback`, data: { role: 'client' } },
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

export default actionRegisterClient;
