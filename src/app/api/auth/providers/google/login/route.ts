import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getQueryParamError } from '@/app/[locale]/(auth)/utils';
import { getSupabaseServerClient } from '@/utils/supabase/client';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const redirectUrl = searchParams.get('redirectUrl');

  if (!code) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirect(`/login?${getQueryParamError('UNEXPECTED')}`);
  }

  const userId = data.user.id;
  // NOTE: Check if user is already registered and have assigned a role
  const roleResponse = await supabase.from('roles').select('role').eq('user_id', userId).single();

  if (roleResponse.error) {
    await supabase.auth.signOut();

    return redirect(`/login?${getQueryParamError('UNEXPECTED')}`);
  }

  if (roleResponse.data.role === null || !roleResponse.data) {
    await supabase.auth.signOut();

    return redirect(`/login?${getQueryParamError('NOT_REGISTERED')}`);
  }

  return redirect(redirectUrl || '/submissions');
}
