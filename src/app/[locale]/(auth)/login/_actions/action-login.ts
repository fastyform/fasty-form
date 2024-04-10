'use server';

import { redirect } from 'next/navigation';
import { formSchema } from '@/app/[locale]/(auth)/login/_utils';
import { getResponse } from '@/utils';
import Constants from '@/utils/constants';
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
    return getResponse(
      'Twoje konto jeszcze czeka na aktywację. Sprawdź swój email, aby dokończyć proces aktywacji konta.',
    );
  }

  if (error.message === 'Invalid login credentials') {
    return getResponse('Nieprawidłowe dane logowania, spróbuj ponownie.');
  }

  return getResponse(Constants.COMMON_ERROR_MESSAGE);
};

export default actionLogin;
