'use server';

import { redirect } from 'next/navigation';
import { formSchema } from '@/app/(auth)/login/_utils';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { SearchParam } from '@/utils/types';

const actionLogin = async (prevState: FormState, payload: { data: FormData; redirectUrlParam: SearchParam }) => {
  const { data, redirectUrlParam: redirectUrl } = payload;
  const formSchemaParsed = formSchema.safeParse({ email: data.get('email'), password: data.get('password') });

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient();
  const { email, password } = formSchemaParsed.data;
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (!error) {
    return redirect(typeof redirectUrl === 'string' ? redirectUrl : '/submissions');
  }

  if (error.message === 'Email not confirmed') {
    return getResponse('Konto nie zostało jeszcze aktywowane. Sprawdź swój email, aby aktywować konto.');
  }

  if (error.message === 'Invalid login credentials') {
    return getResponse('Nieprawidłowe dane logowania, spróbuj ponownie.');
  }

  return getResponse('Wystąpił błąd podczas logowania, spróbuj ponownie, lub skontaktuj się z nami.');
};

export default actionLogin;
