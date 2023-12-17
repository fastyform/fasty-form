'use server';

import { CookieMethods, CookieOptions, createServerClient } from '@supabase/ssr';
import { SupabaseClientOptions } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { Database } from './supabase';

export const getSupabase = (
  options: SupabaseClientOptions<'public'> & { cookies: CookieMethods; cookieOptions?: any },
  supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
) => createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey, options);

// NOTE: For routes and server actions
export const getSupabaseServerClient = (supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!) => {
  const cookieStore = cookies();

  return getSupabase(
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    },
    supabaseKey,
  );
};

export const getSupabaseServerComponentClient = () => {
  const cookieStore = cookies();

  return getSupabase({
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
};
