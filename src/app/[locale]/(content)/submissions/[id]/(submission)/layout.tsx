import { ReactNode, Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import StatusBadge from '@/app/[locale]/(content)/submissions/_components/status-badge';
import MobileNavigationIconLink from '@/components/mobile-navigation-icon-link';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import { Locale } from '@/utils/constants';
import getLoggedInUser from '@/utils/get-logged-in-user';
import {
  SubmissionCreationDate,
  SubmissionStatusBadge,
  SubmissionTrainerName,
} from './_components/submissions-layout-parts';

interface SubmissionLayoutProps {
  children: ReactNode;
  params: { id: string; locale: Locale };
}

const SubmissionLayout = async ({ children, params }: SubmissionLayoutProps) => {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations();
  const user = await getLoggedInUser();
  const isTrainerAccount = await checkIsTrainerAccount(user.id);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <MobileNavigationIconLink aria-label={t('COMMON_SUBMISSIONS')} href="/submissions" icon="back" />
          <Suspense
            fallback={
              <div className="hidden animate-pulse select-none rounded-full bg-shark text-xl lg:block">
                <span className="invisible font-bold">Ostatnia zmiana: </span>
                <span className="invisible">01.04.2001</span>
              </div>
            }
          >
            <SubmissionCreationDate submissionId={params.id} />
          </Suspense>
        </div>

        <div className="flex items-center gap-5">
          {!isTrainerAccount && (
            <Suspense
              fallback={
                <div className="hidden animate-pulse select-none rounded-xl bg-shark text-xl lg:block">
                  <span className="invisible">Trener: </span>
                  <span className="invisible font-bold">Jan Kowalski</span>
                </div>
              }
            >
              <SubmissionTrainerName submissionId={params.id} />
            </Suspense>
          )}
          <Suspense fallback={<StatusBadge type="skeleton" />}>
            <SubmissionStatusBadge submissionId={params.id} />
          </Suspense>
        </div>
      </div>
      {children}
    </>
  );
};

export default SubmissionLayout;
