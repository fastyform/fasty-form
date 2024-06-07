'use server';

import { render } from '@react-email/render';
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import getUserAsAdminById from '@/app/[locale]/(app)/(content)/submissions/_utils/get-user-as-admin-by-id';
import AddedReview from '@/emails/added-review';
import ClientServiceReview from '@/emails/client-service-review';
import Constants, { Locale } from '@/utils/constants';
import getUserLocaleAsAdminById from '@/utils/get-user-locale-by-id';
import { sendMail } from '@/utils/sendgrid';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { trainerReviewFormSchema } from './utils';

interface SubmissionData {
  clientId: string;
  trainerProfileName: string | null;
  submissionId: string;
  trainerProfileSlug: string;
}

const LOCALE_TO_FORM_LINK: Record<Locale, string> = {
  pl: 'https://forms.gle/7Jq4uDsGnzFU6QNp6',
  en: 'https://forms.gle/xZRAF1uYvxdbEBD87',
};

const sendAddedReviewNotificationToClient = async ({
  clientId,
  trainerProfileName,
  submissionId,
  trainerProfileSlug,
}: SubmissionData) => {
  const [user, locale] = await Promise.all([getUserAsAdminById(clientId), getUserLocaleAsAdminById(clientId)]);

  const t = await getTranslations({ locale });

  const addedReviewPromise = sendMail({
    to: user.email as string,
    subject: t('MAIL_TEMPLATE_ADDED_REVIEW_SUBJECT', { profileName: trainerProfileName }),
    html: render(
      <AddedReview
        profileName={trainerProfileName}
        submissionId={submissionId}
        t={t}
        trainerProfileSlug={trainerProfileSlug}
      />,
    ),
  });

  const clientServiceReviewPromise = sendMail({
    to: user.email as string,
    subject: t('MAIL_TEMPLATE_CLIENT_SERVICE_REVIEW_SUBJECT', { appName: Constants.APP_NAME }),
    html: render(<ClientServiceReview formLink={LOCALE_TO_FORM_LINK[locale]} profileName={trainerProfileName} t={t} />),
    sendAt: dayjs().add(1, 'day').unix(),
  });

  await Promise.allSettled([addedReviewPromise, clientServiceReviewPromise]);
};

interface Payload {
  trainerReview: string;
  submissionId: string;
}

const actionAddTrainerReview = async ({ trainerReview, submissionId }: Payload) => {
  const supabase = getSupabaseServerClient();
  const t = await getTranslations();
  trainerReviewFormSchema(t).parse({ trainerReview });

  const { data: submission, error } = await supabase
    .from('submissions')
    .update({ trainer_review: trainerReview, status: 'reviewed', reviewed_at: dayjs().toISOString() })
    .eq('id', submissionId)
    .select('trainers_details (profile_name, profile_slug), client_id')
    .single();

  if (
    !error &&
    submission &&
    submission.trainers_details &&
    submission.client_id &&
    submission.trainers_details.profile_slug
  ) {
    revalidatePath(`/submissions/${submissionId}`);
    revalidatePath('/submissions');

    await sendAddedReviewNotificationToClient({
      clientId: submission.client_id,
      submissionId,
      trainerProfileName: submission.trainers_details.profile_name,
      trainerProfileSlug: submission.trainers_details.profile_slug,
    });

    return;
  }

  throw new Error();
};

export default actionAddTrainerReview;
