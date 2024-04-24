import { Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import { Locale } from '@/utils/constants';
import getLoggedInUser from '@/utils/get-logged-in-user';
import { SearchParams } from '@/utils/types';
import FilterTabs from './_components/filter-tabs';
import SubmissionCardSkeleton from './_components/submission-card/submissions-skeleton';
import Submissions from './_components/submissions';

const SubmissionsPage = async ({
  searchParams,
  params: { locale },
}: {
  searchParams: SearchParams;
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);

  const { id: userId } = await getLoggedInUser();
  const isTrainerAccount = await checkIsTrainerAccount(userId);
  const t = await getTranslations();
  const key = JSON.stringify(searchParams);

  return (
    <>
      <h1 className="text-2xl text-white">{t('SUBMISSIONS_YOURS')}</h1>
      <div className="flex flex-col gap-8">
        <FilterTabs defaultFilterParam={searchParams?.filter} isTrainerAccount={isTrainerAccount} />
        <Suspense key={key} fallback={<SubmissionCardSkeleton />}>
          <Submissions isTrainerAccount={isTrainerAccount} searchParams={searchParams} userId={userId} />
        </Suspense>
      </div>
    </>
  );
};

export default SubmissionsPage;
