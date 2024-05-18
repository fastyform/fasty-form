import { render } from '@react-email/render';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import StripeOnboardingReminder from '@/emails/stripe-onboarding-reminder';
import Constants, { Locale } from '@/utils/constants';
import { sendMail } from '@/utils/sendgrid';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const DAYS_FROM_COMPLETED_PROFILE_ONBOARDING = [1, 4, 11]; // 1 day from creation, 3 days after first reminder, 7 days after second reminder

export async function GET(request: NextRequest) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const today = dayjs();

  // Fetch users who have completed onboarding but need Stripe onboarding reminder
  const stripeOnboardingResponse = await supabase
    .from('trainers_details')
    .select('email, onboarded_at, user_data (locale)')
    .eq('is_onboarded', true)
    .eq('stripe_onboarding_status', 'unverified')
    .not('onboarded_at', 'is', null); // Exclude rows where onboarded_at is null

  if (stripeOnboardingResponse.error) {
    throw new Error(JSON.stringify(stripeOnboardingResponse.error));
  }

  // Filter for Stripe onboarding reminders based on onboarded_at
  const stripeReminderEmails = stripeOnboardingResponse.data
    .filter((user) => {
      const onboardedAt = dayjs(user.onboarded_at);
      const diffDays = today.diff(onboardedAt, 'day');

      return DAYS_FROM_COMPLETED_PROFILE_ONBOARDING.includes(diffDays);
    })
    .map(({ email, user_data }) => ({ email, locale: user_data?.locale })) as { email: string; locale: Locale }[];

  if (stripeReminderEmails.length) {
    const errors: { email: string; error: string }[] = [];
    const emailPromises = stripeReminderEmails.map(async ({ email, locale }) => {
      try {
        const t = await getTranslations({ locale });
        await sendMail({
          to: email,
          subject: t('MAIL_TEMPLATE_STRIPE_ONBOARDING_REMINDER_SUBJECT', { appName: Constants.APP_NAME }),
          html: render(<StripeOnboardingReminder t={t} />),
        });
      } catch (error: any) {
        error.push({ email, error: error?.message });
      }
    });

    await Promise.all(emailPromises);

    return NextResponse.json(
      {
        message: `Sent ${stripeReminderEmails.length} Stripe Onboarding reminder emails`,
        errors,
      },
      { status: 200 },
    );
  }

  return NextResponse.json('No Stripe Onboarding reminder emails reminder to send', { status: 200 });
}
