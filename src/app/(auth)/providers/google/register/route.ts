import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { roleSchema } from '@/utils/validators';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get('code');
  const role = searchParams.get('role');

  const roleSchemaParsed = roleSchema.safeParse(role);

  if (!code || !roleSchemaParsed.success) {
    return redirect('/register?error=true');
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      throw new Error();
    }

    await supabase.from('roles').update({ role: roleSchemaParsed.data }).eq('user_id', data.user.id);
    // TODO: If error logout user and remove from supabase; Add double sign up prevention;
  } catch {
    return redirect('/register?error=true');
  }

  return redirect('/submissions');
}
