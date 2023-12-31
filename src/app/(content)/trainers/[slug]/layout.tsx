import { ReactNode, Suspense } from 'react';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import AppSkeletonButton from '@/components/app-skeleton/app-skeleton-button';
import AppSkeletonWrapper from '@/components/app-skeleton/app-skeleton-wrapper';
import ActionButtonsProfile from './_components/action-buttons-profile';
import getTrainerIdBySlug from './_utils/get-trainer-id-by-slug';

const TrainerPageLayout = async ({
  children,
  modal,
  params,
}: {
  children: ReactNode;
  modal: ReactNode;
  params: { slug: string };
}) => {
  const trainerId = (await getTrainerIdBySlug(params.slug)).user_id;

  return (
    <section className="relative flex w-full flex-col justify-between py-5 lg:h-auto">
      <Suspense>
        <div className="absolute left-0 top-0 hidden gap-2.5 lg:flex">
          <ActionButtonsProfile trainerId={trainerId} />
        </div>
      </Suspense>
      <div className="relative z-30 flex justify-between lg:hidden">
        <MobileNavbarLink aria-label="Zgłoszenia" href="/submissions" icon="back" />
        <Suspense>
          <div className="flex-gap flex gap-2.5 lg:hidden">
            <ActionButtonsProfile trainerId={trainerId} />
          </div>
        </Suspense>
      </div>
      <Suspense
        fallback={
          <div className="flex grow flex-col items-center justify-between gap-10 lg:justify-start">
            <div className="relative mb-auto mt-auto aspect-square w-full max-w-sm animate-pulse rounded-full bg-[#1e2226] object-cover lg:mb-0 lg:mt-0" />
            <div className="flex w-full flex-col items-center gap-10">
              <div className="flex flex-col items-center gap-2.5">
                <AppSkeletonWrapper>
                  <span className="invisible text-2xl font-bold sm:text-4xl md:text-6xl">Jan Kowalski</span>
                </AppSkeletonWrapper>
                <AppSkeletonWrapper>
                  <span className="invisible text-base lg:text-xl">
                    Analiza techniki jednego wideo - <span className="font-bold">25zł </span>
                  </span>
                </AppSkeletonWrapper>
              </div>
              <AppSkeletonButton>Kup analizę techniki</AppSkeletonButton>
            </div>
          </div>
        }
      >
        {children}
      </Suspense>
      {modal}
    </section>
  );
};

export default TrainerPageLayout;
