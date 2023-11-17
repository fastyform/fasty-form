import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/utils/supabase/client';

export async function GET(request: NextRequest) {
  const code = new URL(request.url).searchParams.get('code');

  if (!code) {
    return NextResponse.json({ message: 'Bad request.' }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(new URL('/email-verification/success', request.url));
  } catch {
    return NextResponse.redirect(new URL('/email-verification/error', request.url));
  }
}
