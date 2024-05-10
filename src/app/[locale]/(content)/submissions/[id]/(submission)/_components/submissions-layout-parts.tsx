import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';
import getSubmissionById from '@/app/[locale]/(content)/submissions/[id]/get-submission-by-id';
import TrainerProfileNameLink from '@/app/[locale]/(content)/submissions/[id]/trainer-profile-name-link';
import StatusBadge from '@/app/[locale]/(content)/submissions/_components/status-badge';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getLoggedInUser from '@/utils/get-logged-in-user';

export const SubmissionUpdateDate = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);
  const t = await getTranslations();
  const formattedUpdateDate = dayjs(submission.updated_at).local().format('dddd HH:mm');

  return (
    <span className="hidden text-xl text-white lg:block">
      <span className="font-bold">{t('SUBMISSION_LAST_CHANGE')} </span>
      <span className="capitalize">{formattedUpdateDate}</span>
    </span>
  );
};

export const SubmissionTrainerName = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);
  if (!submission.trainers_details?.profile_name || !submission.trainers_details.profile_slug) throw new Error();

  return (
    <TrainerProfileNameLink
      className="hidden text-xl lg:block"
      profileName={submission.trainers_details.profile_name}
      trainerProfileSlug={submission.trainers_details.profile_slug}
    />
  );
};

export const SubmissionStatusBadge = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);
  const user = await getLoggedInUser();
  const isTrainerAccount = await checkIsTrainerAccount(user.id);

  if (!submission) return;

  return <StatusBadge isTrainerAccount={isTrainerAccount} type={submission.status} />;
};
