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

const actionRegister = async (prevState: FormState, { data: formData, role }: Payload) => {
  const headersList = headers();

  const formSchemaParsed = formSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    policy: formData.get('policy') === 'true',
  });

  if (!formSchemaParsed.success || !role) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { email, password } = formSchemaParsed.data;

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${headersList.get('origin')}/auth/callback?role=${role}` },
  });

  if (data.user?.identities?.length === 0) {
    return getResponse('Istnieje już konto o podanym adresie email.');
  }

  if (error?.status === 429) {
    return getResponse('Zbyt wiele prób rejestracji w krótkim czasie.');
  }

  if (error || !data || !data.user) {
    return getResponse('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.');
  }

  await supabase.from('roles').update({ role }).eq('user_id', data.user.id);

  return getResponse('Rejestracja zakończona! Sprawdź swój email, aby aktywować konto.', true);
};

export default actionRegister;
