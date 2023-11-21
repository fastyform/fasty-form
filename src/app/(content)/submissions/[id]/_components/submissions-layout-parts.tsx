import dayjs from 'dayjs';
import getSubmissionById from '@/app/(content)/submissions/[id]/_utils/get-submission-by-id';
import StatusBadge from '@/app/(content)/submissions/_components/status-badge';

export const SubmissionUpdateDate = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);

  const formattedUpdateDate = dayjs(submission.updated_at).local().format('dddd HH:mm');

  // TODO REMOVE ARTIFICIAL TIMEOUT
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return (
    <span className="hidden text-xl text-white lg:block">
      <span className="font-bold">Ostatnia zmiana: </span>
      <span className="capitalize">{formattedUpdateDate}</span>
    </span>
  );
};

export const SubmissionTrainerName = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);

  // TODO REMOVE ARTIFICIAL TIMEOUT
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return (
    <span className="hidden text-xl text-white lg:block">
      <span>Trener: </span>
      <span className="font-bold text-yellow-400">{submission.trainers_details?.profile_name}</span>
    </span>
  );
};

export const SubmissionStatusBadge = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);

  if (!submission) return;
  // TODO REMOVE ARTIFICIAL TIMEOUT
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return <StatusBadge type={submission.status} />;
};
