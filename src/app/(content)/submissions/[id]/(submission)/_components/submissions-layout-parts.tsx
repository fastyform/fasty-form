import dayjs from 'dayjs';
import getSubmissionById from '@/app/(content)/submissions/[id]/(submission)/_utils/get-submission-by-id';
import TrainerProfileNameLink from '@/app/(content)/submissions/[id]/_components/trainer-profile-name-link';
import StatusBadge from '@/app/(content)/submissions/_components/status-badge';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getUserFromSession from '@/utils/get-user-from-session';

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
  if (!submission.trainers_details?.profile_name) throw new Error();

  return (
    <TrainerProfileNameLink
      className="hidden text-xl lg:block"
      profileName={submission.trainers_details.profile_name}
      trainerId={submission.trainer_id}
    />
  );
};

export const SubmissionStatusBadge = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);
  const user = await getUserFromSession();
  const isTrainerAccount = await checkIsTrainerAccount(user.id);

  if (!submission) return;

  return <StatusBadge isTrainerAccount={isTrainerAccount} type={submission.status} />;
};
