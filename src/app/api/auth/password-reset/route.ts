import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import Constants from '@/utils/constants';
import { getSupabaseServerClient } from '@/utils/supabase/client';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get('token_hash');

  const queryParamRedirectToUrl = searchParams.get('redirect_to') || `${Constants.ORIGIN_URL}`;
  const redirectURL = new URL(queryParamRedirectToUrl);
  const redirectUrlPathname = redirectURL.pathname === '/' ? null : redirectURL.pathname;

  if (!tokenHash) {
    return redirect('/forgot-password/error');
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.auth.verifyOtp({ type: 'recovery', token_hash: tokenHash });

  if (!error) return redirect(`/settings/account${redirectUrlPathname ? `?redirectPath=${redirectUrlPathname}` : ''}`);

  return redirect('/forgot-password/error');
}
