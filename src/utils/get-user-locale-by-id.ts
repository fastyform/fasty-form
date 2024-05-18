import { CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, Locale } from './constants';
import { getSupabase } from './supabase/client';

const getUserLocaleAsAdminById = async (id: string): Promise<Locale> => {
  const cookieStore = cookies();

  const supabase = getSupabase(
    {
      auth: {
        persistSession: false,
        detectSessionInUrl: false,
      },
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
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const localeResponse = await supabase.from('user_data').select('locale').eq('user_id', id).single();

  return localeResponse?.data?.locale || DEFAULT_LOCALE;
};

export default getUserLocaleAsAdminById;
