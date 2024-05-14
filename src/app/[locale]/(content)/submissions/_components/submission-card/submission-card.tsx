import { ReactNode, Suspense } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import StatusBadge from '@/app/[locale]/(content)/submissions/_components/status-badge';
import AppButton from '@/components/app-button';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getLoggedInUser from '@/utils/get-logged-in-user';
import { MessageKey, SubmissionStatus } from '@/utils/types';
import SubmissionCardImage from './submission-card-image';

export const SubmissionCardContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-5 rounded-xl border border-gray-600 bg-shark p-2.5 lg:p-5">{children}</div>
);

const getButtonText = (submissionStatus: SubmissionStatus, isTrainerAccount: boolean): MessageKey => {
  if (submissionStatus === 'paid') {
    return 'SUBMISSION_SEND';
  }

  if (isTrainerAccount && submissionStatus === 'unreviewed') {
    return 'SUBMISSION_ASSES';
  }

  return 'SUBMISSION_DETAILS';
};

interface SubmissionCardProps {
  submissionId: string;
  trainerProfileName: string | undefined;
  submissionStatus: SubmissionStatus;
  videoKey: string | null;
  createdAt: string;
}

const SubmissionCard = async ({
  submissionId,
  trainerProfileName,
  submissionStatus,
  videoKey,
  createdAt,
}: SubmissionCardProps) => {
  const t = await getTranslations();
  const user = await getLoggedInUser();
  const isTrainerAccount = await checkIsTrainerAccount(user.id);

  const href = `/submissions/${submissionId}${submissionStatus === 'paid' ? '/requirements' : ''}`;

  return (
    <SubmissionCardContainer>
      <Link className=" lg:transition-opacity lg:hover:opacity-80" href={href}>
        <div className="flex w-full flex-col items-start gap-5 rounded-xl">
          <div className="relative h-60 w-full rounded-xl bg-bunker min-[450px]:h-40 lg:h-60">
            <Suspense>
              <SubmissionCardImage submissionStatus={submissionStatus} videoKey={videoKey} />
            </Suspense>
            <StatusBadge
              className="absolute right-[5px] top-[5px] lg:right-2.5 lg:top-2.5"
              isTrainerAccount={isTrainerAccount}
              type={submissionStatus}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            {!isTrainerAccount && trainerProfileName && (
              <h5 className="text-sm font-bold text-white lg:text-xl">{trainerProfileName}</h5>
            )}
            <span className="text-xs text-white">
              {t('SUBMISSION_CREATED_AT')} • {dayjs(createdAt).fromNow()}
            </span>
          </div>
        </div>
      </Link>
      <AppButton classes={{ root: 'py-2.5' }} component={Link} href={href}>
        {t(getButtonText(submissionStatus, isTrainerAccount))}
      </AppButton>
    </SubmissionCardContainer>
  );
};

export default SubmissionCard;
