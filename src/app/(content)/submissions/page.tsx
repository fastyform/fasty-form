import { Suspense } from 'react';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import AppLogo from '@/components/app-logo';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';
import { SearchParams } from '@/utils/types';
import FilterTabs from './_components/filter-tabs';
import SubmissionCardSkeleton from './_components/submission-card/submissions-skeleton';
import Submissions from './_components/submissions';

const SubmissionsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { id: userId } = await getUserFromSession();
  const isTrainerAccount = await checkIsTrainerAccount(userId);
  const trainerProfileSlug = userId && isTrainerAccount && (await getTrainerDetailsById(userId)).profile_slug;
  const key = JSON.stringify(searchParams);

  return (
    <>
      <div className="align-center flex w-full justify-between lg:hidden">
        <AppLogo />
        <div className="flex gap-5">
          <MobileNavbarLink aria-label="Ustawienia" href="/settings" icon="settings" />
          {isTrainerAccount && (
            <MobileNavbarLink aria-label="Profil" href={`/trainers/${trainerProfileSlug}`} icon="profile" />
          )}
        </div>
      </div>
      <h1 className="text-2xl text-white">Twoje zgłoszenia</h1>
      <div className="flex flex-col gap-5">
        <FilterTabs defaultFilterParam={searchParams?.filter} isTrainerAccount={isTrainerAccount} />
        <Suspense key={key} fallback={<SubmissionCardSkeleton />}>
          <Submissions isTrainerAccount={isTrainerAccount} searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
};

export default SubmissionsPage;
