import { Suspense } from 'react';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import AppLogo from '@/components/app-logo';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getUserFromSession from '@/utils/get-user-from-session';
import { SearchParams } from '@/utils/types';
import FilterTabs from './_components/filter-tabs';
import SubmissionCardSkeleton from './_components/submission-card/submissions-skeleton';
import Submissions from './_components/submissions';

const SubmissionsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { id: userId } = await getUserFromSession();
  const isTrainerAccount = await checkIsTrainerAccount(userId);
  const key = JSON.stringify(searchParams);

  return (
    <>
      <div className="align-center flex w-full justify-between lg:hidden">
        <AppLogo />
        <div className="flex gap-5">
          <MobileNavbarLink aria-label="Ustawienia" href="/settings" icon="settings" />
          {isTrainerAccount && <MobileNavbarLink aria-label="Profil" href={`/trainers/${userId}`} icon="profile" />}
        </div>
      </div>
      <h1 className="text-2xl text-white">Twoje zgłoszenia</h1>
      <div className="flex flex-col gap-5">
        <FilterTabs defaultFilter={searchParams?.filter} />
        <div className="grid grid-cols-1 gap-5 min-[450px]:grid-cols-2 md:grid-cols-3 md:gap-10 xl:grid-cols-4">
          <Suspense key={key} fallback={<SubmissionCardSkeleton />}>
            <Submissions searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default SubmissionsPage;
