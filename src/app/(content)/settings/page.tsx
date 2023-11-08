import getSupabase from '@/utils/supabase/get-supabase';

const SettingsPage = async () => {
  const supabase = getSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from('trainers_details')
    .select('first_name, last_name')
    .eq('user_id', user?.id || '');

  return <div>{JSON.stringify(data)}</div>;
};

export default SettingsPage;
