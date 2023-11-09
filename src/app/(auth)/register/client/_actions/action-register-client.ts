'use server';

import { formSchema } from '@/app/(auth)/register/client/_utils';
import getSupabase from '@/utils/supabase/get-supabase';

const actionRegisterClient = async (prevState: { message: string; isSuccess: boolean }, data: FormData) => {
  const formSchemaParsed = formSchema.safeParse({
    email: data.get('email'),
    password: data.get('password'),
    policy: data.get('policy') === 'true',
  });

  if (!formSchemaParsed.success) {
    return { message: 'Bad request.', isSuccess: false };
  }

  const supabase = getSupabase();

  const { email, password } = formSchemaParsed.data;

  // TODO: Add user redirectLink to verify email
  const response = await supabase.auth.signUp({ email, password, options: { data: { role: 'client' } } });

  if (response.data.user?.identities?.length === 0) {
    return { message: 'Istnieje już konto o podanym adresie email.', isSuccess: false };
  }

  if (response.error?.status === 429) {
    return { message: 'Zbyt wiele prób rejestracji w krótkim czasie.', isSuccess: false };
  }

  if (response.error) {
    return { message: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.', isSuccess: false };
  }

  return { message: 'Rejestracja zakończona! Sprawdź swój email, aby aktywować konto.', isSuccess: true };
};

export default actionRegisterClient;
