'use server';

import { render } from '@react-email/render';
import { revalidatePath } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import getUserAsAdminById from '@/app/[locale]/(app)/(content)/submissions/_utils/get-user-as-admin-by-id';
import NewVideoRequest from '@/emails/new-video-request';
import Constants from '@/utils/constants';
import getUserLocaleAsAdminById from '@/utils/get-user-locale-by-id';
import { sendMail } from '@/utils/sendgrid';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { requestNewVideoSchema } from './request-new-video-utils';

interface Payload {
  newVideoRequirements: string;
  videoKey: string;
  submissionId: string;
}

const sendClientEmailNewVideoRequestNotification = async (
  clientId: string,
  profileName: string,
  submissionId: string,
) => {
  const [client, locale] = await Promise.all([getUserAsAdminById(clientId), getUserLocaleAsAdminById(clientId)]);
  const t = await getTranslations({ locale });

  await sendMail({
    to: client.email as string,
    subject: t('MAIL_TEMPLATE_NEW_VIDEO_REQUEST_TITLE'),
    html: render(<NewVideoRequest submissionId={submissionId} t={t} trainerName={profileName} />),
  });
};

const actionRequestNewVideo = async (payload: Payload) => {
  const { videoKey, submissionId, newVideoRequirements } = payload;

  const t = await getTranslations();
  const supabase = getSupabaseServerClient();

  requestNewVideoSchema(t).parse({ newVideoRequirements });

  const { data, error } = await supabase
    .from('submissions')
    .update({
      video_key: null,
      status: 'video_request',
      new_video_request_description: newVideoRequirements,
    })
    .eq('id', submissionId)
    .select('trainers_details (profile_name), client_id')
    .single();

  if (error || !data.client_id || !data.trainers_details?.profile_name) throw new Error();

  await sendClientEmailNewVideoRequestNotification(data.client_id, data.trainers_details.profile_name, submissionId);

  await sendMail({
    to: Constants.SUPPORT_MAIL,
    subject: 'Video key to delete',
    html: render(<p>Video Key: {videoKey}</p>),
  });

  revalidatePath(`/submissions/${submissionId}`);
};

export default actionRequestNewVideo;
