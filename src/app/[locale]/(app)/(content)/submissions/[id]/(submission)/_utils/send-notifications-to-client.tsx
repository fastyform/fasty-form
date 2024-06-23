import { render } from '@react-email/render';
import { CookieOptions } from '@supabase/ssr';
import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import getUserAsAdminById from '@/app/[locale]/(app)/(content)/submissions/_utils/get-user-as-admin-by-id';
import AddedReview from '@/emails/added-review';
import ClientServiceReview from '@/emails/client-service-review';
import Constants, { Locale } from '@/utils/constants';
import getUserLocaleAsAdminById from '@/utils/get-user-locale-by-id';
import { sendMail } from '@/utils/sendgrid';
import { getSupabase } from '@/utils/supabase/client';

const LOCALE_TO_FORM_LINK: Record<Locale, string> = {
  pl: 'https://forms.gle/7Jq4uDsGnzFU6QNp6',
  en: 'https://forms.gle/xZRAF1uYvxdbEBD87',
};

interface Payload {
  profile_name: string;
  profile_slug: string;
  client_id: string;
  submissionId: string;
}

const CLIENT_REVIEW_SENT_DAYS_INTERVAL = 30;

export const sendNotificationsToClient = async ({ profile_name, profile_slug, client_id, submissionId }: Payload) => {
  const cookieStore = cookies();
  const supabase = getSupabase(
    {
      auth: { persistSession: false, detectSessionInUrl: false },
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    },
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const t = await getTranslations();

  const clientReviewSentAtPromise = await supabase
    .from('user_data')
    .select('client_review_sent_at')
    .eq('user_id', client_id)
    .single();

  const [user, locale, clientReviewSentAtData] = await Promise.all([
    getUserAsAdminById(client_id),
    getUserLocaleAsAdminById(client_id),
    clientReviewSentAtPromise,
  ]);

  const clientReviewSentAt = clientReviewSentAtData.data?.client_review_sent_at;

  const shouldSendClientServiceReview =
    !clientReviewSentAt || dayjs().diff(dayjs(clientReviewSentAt), 'day') >= CLIENT_REVIEW_SENT_DAYS_INTERVAL;

  const emailPromises = [
    sendMail({
      to: user.email as string,
      subject: t('MAIL_TEMPLATE_ADDED_REVIEW_SUBJECT', { profileName: profile_name }),
      html: render(
        <AddedReview profileName={profile_name} submissionId={submissionId} t={t} trainerProfileSlug={profile_slug} />,
      ),
    }),
    ...(shouldSendClientServiceReview
      ? [
          sendMail({
            to: user.email as string,
            subject: t('MAIL_TEMPLATE_CLIENT_SERVICE_REVIEW_SUBJECT', { appName: Constants.APP_NAME }),
            html: render(
              <ClientServiceReview formLink={LOCALE_TO_FORM_LINK[locale]} profileName={profile_name} t={t} />,
            ),
            sendAt: dayjs().add(1, 'day').unix(),
          }),
          supabase.from('user_data').update({ client_review_sent_at: dayjs().toISOString() }).eq('user_id', client_id),
        ]
      : []),
  ];

  await Promise.allSettled(emailPromises);
};
