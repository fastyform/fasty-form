import { Suspense } from 'react';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import AppLogo from '@/components/app-logo';
import { getUserIdFromSession, getUserRoleFromSession } from '@/utils/get-data-from-session';
import { getSupabaseServerComponentClient } from '@/utils/supabase/client';
import FilterTabs from './_components/filter-tabs';
import SubmissionCardSkeleton from './_components/submission-card/submissions-skeleton';
import Submissions from './_components/submissions';

const SubmissionsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const isTrainerAccount = (await getUserRoleFromSession()) === 'trainer';
  const key = JSON.stringify(searchParams);

  const userId = (await getUserIdFromSession()) || '';
  const supabase = getSupabaseServerComponentClient();
  const { data: trainerData } = await supabase.from('trainers_details').select('id').eq('user_id', userId).single();

  return (
    <>
      <div className="align-center flex w-full justify-between lg:hidden">
        <AppLogo />
        <div className="flex gap-5">
          <MobileNavbarLink aria-label="Ustawienia" href="/settings" icon="settings" />
          {isTrainerAccount && (
            <MobileNavbarLink aria-label="Profil" href={`/trainers/${trainerData?.id}`} icon="profile" />
          )}
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
