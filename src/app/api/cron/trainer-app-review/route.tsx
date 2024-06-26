import { render } from '@react-email/render';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import TrainerAppReview from '@/emails/trainer-app-review';
import Constants, { Locale } from '@/utils/constants';
import { sendMail } from '@/utils/sendgrid';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const DAYS_FROM_COMPLETED_PROFILE_ONBOARDING = 14;

const LOCALE_TO_FORM_LINK: Record<Locale, string> = {
  pl: 'https://forms.gle/vNedouzTVNGZeY3UA',
  en: 'https://forms.gle/3MEyvGRE8c4qdcK37',
};

export async function GET(request: NextRequest) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const today = dayjs();

  // Fetch users who have completed profile onboarding
  const stripeOnboardingResponse = await supabase
    .from('trainers_details')
    .select('email, onboarded_at, app_review_sent_at, user_id, profile_name, user_data (locale)')
    .eq('is_onboarded', true);

  if (stripeOnboardingResponse.error) {
    throw new Error(JSON.stringify(stripeOnboardingResponse.error));
  }

  // Filter for Stripe onboarding reminders based on onboarded_at
  const trainerAppReviewEmails = stripeOnboardingResponse.data
    .filter((user) => {
      const onboardedAt = dayjs(user.onboarded_at);
      const diffDays = today.diff(onboardedAt, 'day');

      return diffDays >= DAYS_FROM_COMPLETED_PROFILE_ONBOARDING && !user.app_review_sent_at;
    })
    .map(({ email, user_data, profile_name, user_id }) => ({
      email,
      locale: user_data?.locale,
      profile_name,
      user_id,
    })) as {
    email: string;
    locale: Locale;
    profile_name: string;
    user_id: string;
  }[];

  if (trainerAppReviewEmails.length) {
    const errors: { email: string; error: string }[] = [];
    const emailPromises = trainerAppReviewEmails.map(async ({ email, locale, profile_name, user_id }) => {
      try {
        const t = await getTranslations({ locale });
        await sendMail({
          to: email,
          subject: t('MAIL_TEMPLATE_TRAINER_APP_REVIEW_SUBJECT', { appName: Constants.APP_NAME }),
          html: render(<TrainerAppReview formLink={LOCALE_TO_FORM_LINK[locale]} profileName={profile_name} t={t} />),
        });
      } catch (error: any) {
        errors.push({ email, error: error?.message });
      }

      try {
        await supabase
          .from('trainers_details')
          .update({ app_review_sent_at: today.toISOString() })
          .eq('user_id', user_id);
      } catch (error: any) {
        errors.push({ email, error: error?.message });
      }
    });

    await Promise.all(emailPromises);

    return NextResponse.json(
      {
        message: `Sent ${trainerAppReviewEmails.length} Trainer App Request Reviews Emails`,
        errors,
      },
      { status: 200 },
    );
  }

  return NextResponse.json('No Trainer App Request Reviews emails to send', { status: 200 });
}
