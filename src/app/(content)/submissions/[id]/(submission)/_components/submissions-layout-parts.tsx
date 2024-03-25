import dayjs from 'dayjs';
import getSubmissionById from '@/app/(content)/submissions/[id]/(submission)/_utils/get-submission-by-id';
import TrainerProfileNameLink from '@/app/(content)/submissions/[id]/_components/trainer-profile-name-link';
import StatusBadge from '@/app/(content)/submissions/_components/status-badge';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getLoggedInUser from '@/utils/get-logged-in-user';

export const SubmissionUpdateDate = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);

  const formattedUpdateDate = dayjs(submission.updated_at).local().format('dddd HH:mm');

  return (
    <span className="hidden text-xl text-white lg:block">
      <span className="font-bold">Ostatnia zmiana: </span>
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
