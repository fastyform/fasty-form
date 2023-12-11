import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { getSupabaseServerClient } from '@/utils/supabase/client';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const redirectUrl = searchParams.get('redirectUrl');

  if (!code) {
    return redirect('/forgot-password/error');
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (!error) return redirect(`/settings/update-password${redirectUrl ? `?redirectUrl=${redirectUrl}` : ''}`);

  return redirect('/forgot-password/error');
}
