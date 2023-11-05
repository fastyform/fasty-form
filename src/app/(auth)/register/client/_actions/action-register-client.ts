'use server';

// import { redirect } from 'next/navigation';
// import { NextResponse } from 'next/server';
// import { formSchema } from '@/app/(auth)/login/_utils';
// import getSupabase from '@/utils/get-supabase';

const actionRegisterClient = async (prevState: any, data: FormData) => {
  console.log(data.get('email'));

  return { message: 'Register client' };
  // const formSchemaParsed = formSchema.safeParse({ email: data.get('email'), password: data.get('password') });

  // if (!formSchemaParsed.success) {
  //   return NextResponse.json({ status: 400 });
  // }

  // const supabase = getSupabase();
  // const { email, password } = formSchemaParsed.data;
  // const { error } = await supabase.auth.signInWithPassword({ email, password });

  // if (!error) {
  //   return redirect('/orders');
  // }

  // if (error.status === 400) {
  //   return { message: error.message };
  // }

  // return { message: 'Something went wrong, try again' };
};

export default actionRegisterClient;
