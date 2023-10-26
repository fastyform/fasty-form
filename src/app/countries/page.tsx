import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: countries } = await supabase.from('countries').select();

  return (
    <ul className="text-foreground my-auto">{countries?.map((country) => <li key={country.id}>{country.name}</li>)}</ul>
  );
}
