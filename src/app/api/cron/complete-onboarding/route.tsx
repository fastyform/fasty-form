import { render } from '@react-email/render';
import dayjs from 'dayjs';
import { NextRequest } from 'next/server';
import Constants from '@/utils/constants';
import MailTemplate from '@/utils/mail/mail-template';
import { sendMultipleMails } from '@/utils/mail/send-mail';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import AppOnboardingMailTemplateContent from './app-onboarding-mail-template-content';
import StripeOnboardingMailTemplateContent from './stripe-onboarding-mail-template-content';

const emailsData = {
  appOnboarding: [
    `Dokończ rejestrację i odblokuj możliwości na ${Constants.APP_NAME}`,
    `Zakończ onboarding i wykorzystaj pełny potencjał ${Constants.APP_NAME}`,
  ],
  stripeOnboarding: [
    `Aktywuj odbieranie płatności na ${Constants.APP_NAME} – ostatni krok!`,
    `Dokończ ustawienia płatności i zacznij zarabiać z ${Constants.APP_NAME}`,
  ],
};

const DAYS_FROM_CREATION = [1, 4, 11]; // 1 day from creation, 3 days after first reminder, 7 days after second reminder

export async function GET(request: NextRequest) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Email reminders sent', { status: 401 });
  }

  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const today = dayjs();

  try {
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
      const [subject, title] = emailsData.appOnboarding;
      sendMultipleMails({
        mails: incompleteAppOnboardingEmailsData,
        subject,
        html: render(
          <MailTemplate showReplyDiscouragedInfo={false} title={title}>
            <AppOnboardingMailTemplateContent />
          </MailTemplate>,
        ),
      }).then(() => {
        console.log(`Sent ${incompleteAppOnboardingEmailsData.length} emails`);
      });
    } else {
      console.log('No Incomplete Onboarding emails to send');
    }
  } catch (error) {
    console.error(error);
  }

  try {
    // Fetch users who have completed onboarding but need Stripe onboarding reminder
    const stripeOnboardingResponse = await supabase
      .from('trainers_details')
      .select('email, onboarded_at')
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

        return DAYS_FROM_CREATION.includes(diffDays);
      })
      .map(({ email }) => ({ email })) as { email: string }[];

    if (stripeReminderEmails.length) {
      const [subject, title] = emailsData.stripeOnboarding;
      sendMultipleMails({
        mails: stripeReminderEmails,
        subject,
        html: render(
          <MailTemplate showReplyDiscouragedInfo={false} title={title}>
            <StripeOnboardingMailTemplateContent />
          </MailTemplate>,
        ),
      }).then(() => {
        console.log(`Sent ${stripeReminderEmails.length} Stripe Onboarding emails`);
      });
    } else {
      console.log('No Stripe Onboarding emails to send');
    }
  } catch (error) {
    console.error(error);
  }

  return new Response('Email reminders sent', { status: 200 });
}
