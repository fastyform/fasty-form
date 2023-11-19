import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { getSupabaseServerClient } from '@/utils/supabase/client';

export async function GET(request: NextRequest) {
  const code = new URL(request.url).searchParams.get('code');

  if (!code) {
    return redirect('/email-verification/error');
  }

  try {
    const supabase = getSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  } catch {
    return redirect('/email-verification/error');
  }

  return redirect('/email-verification/success');
}
