import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getQueryParamError } from '@/app/[locale]/(auth)/utils';
import { DEFAULT_LOCALE, Locale, LOCALES } from '@/utils/constants';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const isLocaleValid = (locale: string): locale is Locale => LOCALES.includes(locale);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const redirectUrl = searchParams.get('redirectUrl');
  const localeParam = searchParams.get('locale') || '';
  const locale = isLocaleValid(localeParam) ? localeParam : DEFAULT_LOCALE;

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
  const roleResponse = await supabase.from('user_data').select('role').eq('user_id', userId).single();

  if (roleResponse.error) {
    await supabase.auth.signOut();

    return redirect(`/login?${getQueryParamError('UNEXPECTED')}`);
  }

  if (roleResponse.data.role === null || !roleResponse.data) {
    await supabase.auth.signOut();

    return redirect(`/login?${getQueryParamError('NOT_REGISTERED')}`);
  }

  try {
    await supabase.from('user_data').update({ locale }).eq('user_id', userId);
  } catch {}

  return redirect(redirectUrl || '/submissions');
}
