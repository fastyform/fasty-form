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
    return getResponse(
      'Właśnie wysłaliśmy Ci link aktywacyjny. Zerknij na swoją pocztę i aktywuj konto. Czekamy na Ciebie!',
      true,
    );
  }

  if (error.message === 'Signups not allowed for otp') {
    return getResponse(
      'Ups! Ten adres email nie figuruje w naszej bazie. Sprawdź, czy dobrze go wpisałeś i spróbuj jeszcze raz.',
    );
  }

  if (error.status === 429) {
    return getResponse(
      'Ojej! Wygląda na to, że było już kilka prób wysłania linku aktywacyjnego. Dajmy systemowi chwilę oddechu. Spróbuj ponownie za jakiś czas.',
    );
  }

  return getResponse(
    'Hmm, coś poszło nie tak. Wystąpił nieoczekiwany błąd. Odpocznij chwilę i spróbuj ponownie za jakiś czas.',
  );
};

export default actionResendEmailConfirmation;
