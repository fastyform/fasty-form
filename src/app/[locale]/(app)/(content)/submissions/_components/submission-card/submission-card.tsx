import { ReactNode, Suspense } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import StatusBadge from '@/app/[locale]/(app)/(content)/submissions/_components/status-badge';
import AppButton from '@/components/app-button';
import TrainerImage from '@/components/trainer-image';
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
  trainerProfileImageUrl: string | null;
}

const SubmissionCard = async ({
  submissionId,
  trainerProfileName,
  submissionStatus,
  videoKey,
  createdAt,
  trainerProfileImageUrl,
}: SubmissionCardProps) => {
  const t = await getTranslations();
  const user = await getLoggedInUser();
  const isTrainerAccount = await checkIsTrainerAccount(user.id);

  const isNewVideoRequest = submissionStatus === 'new_video_request' && !isTrainerAccount;

  const href = `/submissions/${submissionId}${submissionStatus === 'paid' || isNewVideoRequest ? '/requirements' : ''}`;

  return (
    <SubmissionCardContainer>
      <Link className=" lg:transition-opacity lg:hover:opacity-80" href={href}>
        <div className="flex w-full flex-col items-start gap-5 rounded-xl">
          <div className="relative h-60 w-full rounded-xl bg-bunker min-[450px]:h-40 lg:h-60">
            <Suspense>
              <SubmissionCardImage
                isTrainerAccount={isTrainerAccount}
                submissionStatus={submissionStatus}
                videoKey={videoKey}
              />
            </Suspense>
            <StatusBadge
              className="absolute right-[5px] top-[5px] lg:right-2.5 lg:top-2.5"
              isTrainerAccount={isTrainerAccount}
              type={submissionStatus}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            {!isTrainerAccount && trainerProfileName && (
              <div className="flex items-center gap-2.5">
                <TrainerImage
                  height={32}
                  trainerProfileImageUrl={trainerProfileImageUrl}
                  trainerProfileName={trainerProfileName}
                  width={32}
                />
                <h5 className="text-sm font-bold text-white lg:text-xl">{trainerProfileName}</h5>
              </div>
            )}
            <span className="text-xs text-white">
              {t('SUBMISSION_CREATED_AT')} • {dayjs(createdAt).fromNow()}
            </span>
          </div>
        </div>
      </Link>
      <AppButton component={Link} href={href}>
        {t(getButtonText(submissionStatus, isTrainerAccount))}
      </AppButton>
    </SubmissionCardContainer>
  );
};

export default SubmissionCard;
