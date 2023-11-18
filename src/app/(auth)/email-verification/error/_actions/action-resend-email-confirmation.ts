'use server';

import { headers } from 'next/headers';
import { formSchema } from '@/app/(auth)/email-verification/error/_utils';
import { getResponse } from '@/utils';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionResendEmailConfirmation = async (prevState: { message: string; isSuccess: boolean }, data: FormData) => {
  const headersList = headers();

  const formSchemaParsed = formSchema.safeParse({ email: data.get('email') });

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient();

  const { email } = formSchemaParsed.data;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${headersList.get('origin')}/auth/callback`,
    },
  });

  if (!error) {
    return getResponse('Wysłałeś ponownie link aktywacyjny. Sprawdź swoją skrzynkę mailową.', true);
  }

  if (error.message === 'Signups not allowed for otp') {
    return getResponse(
      'Podany adres email nie istnieje w bazie danych. Sprawdź poprawność wprowadzonego adresu e-mail.',
    );
  }

  if (error.status === 429) {
    return getResponse('Zbyt wiele prób wysłania linku aktywacyjnego. Spróbuj ponownie później.');
  }

  return getResponse('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.');
};

export default actionResendEmailConfirmation;
