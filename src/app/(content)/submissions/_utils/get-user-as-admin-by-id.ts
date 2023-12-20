import { getSupabaseServerClient } from '@/utils/supabase/client';

const getUserAsAdminById = async (id: string) => {
  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { data, error } = await supabase.auth.admin.getUserById(id);
  if (error || !data.user) throw new Error('Admins get user error');

  return data.user;
};

export default getUserAsAdminById;
