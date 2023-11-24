'use server';

import { headers } from 'next/headers';
import { formSchema } from '@/app/(auth)/register/_utils';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { Database } from '@/utils/supabase/supabase';

interface Payload {
  data: FormData;
  role: Database['public']['Enums']['role'];
}

const actionRegister = async (prevState: FormState, { data, role }: Payload) => {
  const headersList = headers();

  const formSchemaParsed = formSchema.safeParse({
    email: data.get('email'),
    password: data.get('password'),
    policy: data.get('policy') === 'true',
  });

  if (!formSchemaParsed.success || !role) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient();

  const { email, password } = formSchemaParsed.data;

  const response = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${headersList.get('origin')}/auth/callback?role=${role}` },
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

export default actionRegister;
