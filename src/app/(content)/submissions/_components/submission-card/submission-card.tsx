import { ReactNode, Suspense } from 'react';
import { Route } from 'next';
import Link from 'next/link';
import StatusBadge from '@/app/(content)/submissions/_components/status-badge';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getUserFromSession from '@/utils/get-user-from-session';
import { SubmissionStatus } from '@/utils/types';
import SubmissionCardImage from './submission-card-image';

export const SubmissionCardContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-5 rounded-xl border border-gray-600 bg-[#1e2226] p-2.5 lg:p-5">{children}</div>
);

const getButtonText = (submissionStatus: SubmissionStatus, isTrainerAccount: boolean) => {
  if (submissionStatus === 'paid') {
    return 'Wyślij wideo';
  }

  if (isTrainerAccount && submissionStatus === 'unreviewed') {
    return 'Oceń technikę';
  }

  return 'Szczegóły';
};

const SubmissionCard = async ({
  submissionId,
  trainerProfileName,
  submissionStatus,
  videoKey,
}: {
  submissionId: string;
  trainerProfileName: string | undefined;
  submissionStatus: SubmissionStatus;
  videoKey: string | null;
}) => {
  const user = await getUserFromSession();
  const isTrainerAccount = await checkIsTrainerAccount(user.id);

  const href = `/submissions/${submissionId}${submissionStatus === 'paid' ? '/requirements' : ''}` as Route;

  return (
    <SubmissionCardContainer>
      <Link className=" lg:transition-opacity lg:hover:opacity-80" href={href}>
        <div className="flex w-full flex-col items-start gap-5 rounded-xl">
          <div className="relative h-60 w-full rounded-xl bg-[#0D1116] min-[450px]:h-40 lg:h-60">
            <Suspense fallback={<p>loading</p>}>
              <SubmissionCardImage submissionStatus={submissionStatus} videoKey={videoKey} />
            </Suspense>
            <StatusBadge
              className="absolute right-[5px] top-[5px] lg:right-2.5 lg:top-2.5"
              isTrainerAccount={isTrainerAccount}
              type={submissionStatus}
            />
          </div>
          {!isTrainerAccount && trainerProfileName && (
            <h5 className="text-sm font-bold text-white lg:text-xl">{trainerProfileName}</h5>
          )}
        </div>
      </Link>
      <Link
        className="w-full rounded-full bg-yellow-400 py-[10px] text-center text-xs font-bold text-black lg:text-base lg:transition-opacity lg:hover:opacity-80"
        href={href}
      >
        {getButtonText(submissionStatus, isTrainerAccount)}
      </Link>
    </SubmissionCardContainer>
  );
};

export default SubmissionCard;
