import { render } from '@react-email/render';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import OnboardingReminder from '@/emails/onboarding-reminder';
import Constants, { Locale } from '@/utils/constants';
import { sendMail } from '@/utils/sendgrid';
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
    .select('email, created_at, user_data (locale)')
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
    .map(({ email, user_data }) => ({ email, locale: user_data?.locale })) as { email: string; locale: Locale }[];

  if (incompleteAppOnboardingEmailsData.length) {
    const errors: { email: string; error: string }[] = [];
    const emailPromises = incompleteAppOnboardingEmailsData.map(async ({ email, locale }) => {
      try {
        const t = await getTranslations({ locale });
        await sendMail({
          to: email,
          subject: t('MAIL_TEMPLATE_ONBOARDING_REMINDER_SUBJECT', { appName: Constants.APP_NAME }),
          html: render(<OnboardingReminder t={t} />),
        });
      } catch (error: any) {
        errors.push({ email, error: error?.message });
      }
    });

    await Promise.all(emailPromises);

    return NextResponse.json(
      {
        message: `Sent ${incompleteAppOnboardingEmailsData.length} onboarding reminder emails`,
        errors,
      },
      { status: 200 },
    );
  }

  return NextResponse.json('No onboarding reminder emails to send', { status: 200 });
}
