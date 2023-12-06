import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getQueryParamError } from '@/app/(auth)/_utils';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { roleSchema } from '@/utils/validators';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const role = searchParams.get('role');
  const redirectUrl = searchParams.get('redirectUrl');

  const roleSchemaParsed = roleSchema.safeParse(role);

  if (!code || !roleSchemaParsed.success) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const { data: parsedRole } = roleSchemaParsed;

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirect(`/register/${parsedRole}?${getQueryParamError('UNEXPECTED')}`);
  }

  const userId = data.user.id;

  // NOTE: Check if user is already registered and have assigned a role
  const roleResponse = await supabase.from('roles').select('role').eq('user_id', userId).single();

  if (roleResponse.error || !roleResponse.data) {
    await supabase.auth.signOut();

    return redirect(`/register/${parsedRole}?${getQueryParamError('UNEXPECTED')}`);
  }

  if (roleResponse.data.role !== null) {
    await supabase.auth.signOut();

    return redirect(`/register/${parsedRole}?${getQueryParamError('ALREADY_REGISTERED')}`);
  }

  const updateRoleResponse = await supabase.from('roles').update({ role: parsedRole }).eq('user_id', userId);

  if (updateRoleResponse.error) {
    await supabase.auth.signOut();

    return redirect(`/register/${parsedRole}?${getQueryParamError('UNEXPECTED')}`);
  }

  return redirect(redirectUrl || '/submissions');
}
