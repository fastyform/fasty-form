import { ReactNode, Suspense } from 'react';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import AppSkeletonButton from '@/components/app-skeletons/app-skeleton-button';
import AppSkeletonWrapper from '@/components/app-skeletons/app-skeleton-wrapper';
import EditButtonDesktop from './_components/edit-button-desktop';
import EditButtonMobile from './_components/edit-button-mobile';
import LoginFormModal from './_components/login-form-modal/login-form-modal';

const TrainerPageLayout = async ({
  children,
  modal,
  params,
}: {
  children: ReactNode;
  modal: ReactNode;
  params: { id: string };
}) => (
  <section className="relative flex w-full flex-col justify-between py-5 lg:h-auto">
    <Suspense>
      <EditButtonDesktop trainerId={params.id} />
    </Suspense>
    <div className="relative z-30 flex justify-between lg:hidden">
      <MobileNavbarLink aria-label="Zgłoszenia" href="/submissions" icon="back" />
      <Suspense>
        <EditButtonMobile trainerId={params.id} />
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
      <LoginFormModal trainerId={params.id} />
      {children}
    </Suspense>
    {modal}
  </section>
);

export default TrainerPageLayout;
