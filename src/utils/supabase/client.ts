'use server';

import { CookieMethods, CookieOptions, createServerClient } from '@supabase/ssr';
import { SupabaseClientOptions } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { Database } from './supabase';

export const getSupabase = (
  options: SupabaseClientOptions<'public'> & { cookies: CookieMethods; cookieOptions?: any },
) => createServerClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, options);

// NOTE: For routes and server actions
export const getSupabaseServerClient = () => {
  const cookieStore = cookies();

  return getSupabase({
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
  });
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
