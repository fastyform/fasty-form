'use server';

import { CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { FormValues } from '@/app/(auth)/login/_components/utils';

const handleLogin = async (data: FormValues) => {
  const cookieStore = cookies();
  const { email, password } = data;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options });
        },
      },
    },
  );

  await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export default handleLogin;
