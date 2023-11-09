'use server';

import { redirect } from 'next/navigation';
import { formSchema } from '@/app/(auth)/login/_utils';
import getSupabase from '@/utils/supabase/get-supabase';

const actionSignIn = async (prevState: { message: string }, data: FormData) => {
  const formSchemaParsed = formSchema.safeParse({ email: data.get('email'), password: data.get('password') });

  if (!formSchemaParsed.success) {
    return { message: 'Bad request.' };
  }

  const supabase = getSupabase();
  const { email, password } = formSchemaParsed.data;
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (!error) {
    return redirect('/submissions');
  }

  if (error.status === 400) {
    return { message: 'Nieprawidłowe dane logowania, spróbuj ponownie.' };
  }

  return { message: 'Wystąpił błąd podczas logowania, spróbuj ponownie, lub skontaktuj się z nami.' };
};

export default actionSignIn;
