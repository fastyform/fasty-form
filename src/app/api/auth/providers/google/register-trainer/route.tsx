import { render } from '@react-email/render';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import { getQueryParamError } from '@/app/[locale]/(auth)/utils';
import WelcomeMailTrainer from '@/emails/welcome-email-trainer';
import Constants, { DEFAULT_LOCALE } from '@/utils/constants';
import { sendMail } from '@/utils/sendgrid';
import { getSupabaseServerClient } from '@/utils/supabase/client';

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
    return redirect(`/register/trainer?${getQueryParamError('UNEXPECTED')}`);
  }

  const userId = data.user.id;

  // NOTE: Check if user is already registered and have assigned a role
  const roleResponse = await supabase.from('user_data').select('role').eq('user_id', userId).single();

  if (roleResponse.error || !roleResponse.data) {
    await supabase.auth.signOut();

    return redirect(`/register/trainer?${getQueryParamError('UNEXPECTED')}`);
  }

  if (roleResponse.data.role !== null) {
    await supabase.auth.signOut();

    return redirect(`/register/trainer?${getQueryParamError('ALREADY_REGISTERED')}`);
  }

  const updateRoleResponse = await supabase.from('user_data').update({ role: 'trainer' }).eq('user_id', userId);

  if (updateRoleResponse.error) {
    await supabase.auth.signOut();

    return redirect(`/register/trainer?${getQueryParamError('UNEXPECTED')}`);
  }

  const t = await getTranslations({ locale });
  await sendMail({
    to: data.user.email as string,
    subject: t('MAIL_TEMPLATE_WELCOME_SUBJECT', { appName: Constants.APP_NAME }),
    html: render(<WelcomeMailTrainer t={t} />),
  });

  return redirect(redirectUrl || '/submissions');
}
