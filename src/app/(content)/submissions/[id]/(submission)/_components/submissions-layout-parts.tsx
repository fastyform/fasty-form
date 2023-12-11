import dayjs from 'dayjs';
import getSubmissionById from '@/app/(content)/submissions/[id]/(submission)/_utils/get-submission-by-id';
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

  return (
    <span className="hidden text-xl text-white lg:block">
      <span>Trener: </span>
      <span className="font-bold text-yellow-400">{submission.trainers_details?.profile_name}</span>
    </span>
  );
};

export const SubmissionStatusBadge = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);
  const user = await getUserFromSession();
  const isTrainerAccount = await checkIsTrainerAccount(user.id);

  if (!submission) return;

  return <StatusBadge isTrainerAccount={isTrainerAccount} type={submission.status} />;
};
