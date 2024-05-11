import { render } from '@react-email/render';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import OnboardingReminder from '@/emails/onboarding-reminder';
import Constants from '@/utils/constants';
import { sendMultipleMails } from '@/utils/sendgrid';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const DAYS_FROM_CREATION = [1, 4, 11]; // 1 day from creation, 3 days after first reminder, 7 days after second reminder

export async function GET(request: NextRequest) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const today = dayjs();

  // Fetch users who haven't completed onboarding
  const appOnboardingResponse = await supabase
    .from('trainers_details')
    .select('email, created_at')
    .eq('is_onboarded', false)
    .neq('email', null); // old fields might not have an email

  if (appOnboardingResponse.error) {
    throw new Error(JSON.stringify(appOnboardingResponse.error));
  }

  // Filter for reminders based on created_at
  const incompleteAppOnboardingEmailsData = appOnboardingResponse.data
    .filter((user) => {
      const createdAt = dayjs(user.created_at);
      const diffDays = today.diff(createdAt, 'day');

      return DAYS_FROM_CREATION.includes(diffDays);
    })
    .map(({ email }) => ({ email })) as { email: string }[];

  if (incompleteAppOnboardingEmailsData.length) {
    const t = await getTranslations({ locale: 'pl' });
    await sendMultipleMails({
      mails: incompleteAppOnboardingEmailsData,
      subject: t('MAIL_TEMPLATE_ONBOARDING_REMINDER_SUBJECT', { appName: Constants.APP_NAME }),
      html: render(<OnboardingReminder t={t} />),
    });

    return NextResponse.json(`Sent ${incompleteAppOnboardingEmailsData.length} emails`, { status: 200 });
  }

  return NextResponse.json('No Incomplete Onboarding emails to send', { status: 200 });
}
