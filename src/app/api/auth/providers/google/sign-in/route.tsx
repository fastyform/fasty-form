import { render } from '@react-email/render';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import { getQueryParamError } from '@/app/[locale]/(auth)/utils';
import WelcomeMailClient from '@/emails/welcome-email-client';
import Constants, { DEFAULT_LOCALE } from '@/utils/constants';
import { sendMail } from '@/utils/sendgrid';
import { getSupabaseServerClient } from '@/utils/supabase/client';

// NOTE: in this flow
// if there is no account - creates a new account with client role
// if there is account - log in

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const redirectUrl = searchParams.get('redirectUrl');
  const locale = searchParams.get('locale') || DEFAULT_LOCALE;

  if (!code) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirect(`/register/client?${getQueryParamError('UNEXPECTED')}`);
  }

  const userId = data.user.id;

  // NOTE: Check if user is already registered and have assigned a role
  const roleResponse = await supabase.from('user_data').select('role').eq('user_id', userId).single();

  if (roleResponse.error) {
    await supabase.auth.signOut();

    return redirect(`/register/client?${getQueryParamError('UNEXPECTED')}`);
  }

  if (roleResponse.data.role !== null) {
    return redirect(redirectUrl || '/submissions');
  }

  const updateRoleResponse = await supabase.from('user_data').update({ role: 'client' }).eq('user_id', userId);

  if (updateRoleResponse.error) {
    await supabase.auth.signOut();

    return redirect(`/register/client?${getQueryParamError('UNEXPECTED')}`);
  }

  const t = await getTranslations({ locale });
  await sendMail({
    to: data.user.email as string,
    subject: t('MAIL_TEMPLATE_WELCOME_SUBJECT', { appName: Constants.APP_NAME }),
    html: render(<WelcomeMailClient t={t} />),
  });

  return redirect(redirectUrl || '/submissions');
}
