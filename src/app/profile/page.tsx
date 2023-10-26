import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const Profile = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from('trainers_details')
    .select('first_name, last_name')
    .eq('user_id', user?.id);

  return <div>{JSON.stringify(data)}</div>;
};
export default Profile;
