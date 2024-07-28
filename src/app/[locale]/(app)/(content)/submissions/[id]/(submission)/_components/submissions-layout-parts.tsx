import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';
import getSubmissionById from '@/app/[locale]/(app)/(content)/submissions/[id]/get-submission-by-id';
import TrainerProfileNameLink from '@/app/[locale]/(app)/(content)/submissions/[id]/trainer-profile-name-link';
import StatusBadge from '@/app/[locale]/(app)/(content)/submissions/_components/status-badge';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getLoggedInUser from '@/utils/get-logged-in-user';

export const SubmissionCreationDate = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);
  const t = await getTranslations();
  const formattedCreationDate = dayjs(submission.created_at).fromNow();

  return (
    <span className="hidden text-xl text-white lg:block">
      <span className="font-bold">{t('SUBMISSION_CREATED_AT')}</span>
      <span> • {formattedCreationDate}</span>
    </span>
  );
};

export const SubmissionTrainerName = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);
  if (!submission.trainers_details?.profile_name || !submission.trainers_details.profile_slug) throw new Error();

  return (
    <TrainerProfileNameLink
      className="hidden text-xl lg:flex"
      profileImageUrl={submission.trainers_details.profile_image_url}
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
