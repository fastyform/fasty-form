import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import Constants from '@/utils/constants';
import { getSupabaseServerClient } from '@/utils/supabase/client';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const queryParamRedirectToUrl = searchParams.get('redirect_to') || `${Constants.ORIGIN_URL}`;
  const redirectURL = new URL(queryParamRedirectToUrl);
  const redirectUrlPathname = redirectURL.pathname === '/' ? null : redirectURL.pathname;

  if (!code) {
    return redirect('/email-verification/error');
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.auth.verifyOtp({ type: 'email', token_hash: code });

    if (error) {
      throw new Error(error.message);
    }
  } catch {
    return redirect('/email-verification/error');
  }

  return redirect(`/email-verification/success${redirectUrlPathname ? `?redirectUrl=${redirectUrlPathname}` : ''}`);
}
