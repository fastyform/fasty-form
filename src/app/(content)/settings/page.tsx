import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const SettingsPage = async () => {
  const cookieStore = cookies();
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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from('trainers_details')
    .select('first_name, last_name')
    .eq('user_id', user?.id);

  return <div>{JSON.stringify(data)}</div>;
};

export default SettingsPage;
