import { ReactNode, Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import AppSkeletonButton from '@/components/app-skeleton/app-skeleton-button';
import AppSkeletonWrapper from '@/components/app-skeleton/app-skeleton-wrapper';
import { Locale } from '@/utils/constants';
import getTrainerIdBySlug from './_utils/get-trainer-id-by-slug';
import ActionButtonsProfile from './action-buttons-profile';

const TrainerPageLayout = async ({
  children,
  modal,
  params,
}: {
  children: ReactNode;
  modal: ReactNode;
  params: { slug: string; locale: Locale };
}) => {
  unstable_setRequestLocale(params.locale);

  const t = await getTranslations();
  const trainerId = (await getTrainerIdBySlug(params.slug)).user_id;

  return (
    <section className="relative flex w-full flex-col justify-between lg:h-auto">
      <Suspense>
        <div className="absolute left-0 top-0 hidden gap-2.5 lg:flex">
          <ActionButtonsProfile trainerId={trainerId} />
        </div>
      </Suspense>
      <div className="relative z-30 flex justify-end lg:hidden">
        <Suspense>
          <div className="flex-gap flex gap-2.5 lg:hidden">
            <ActionButtonsProfile trainerId={trainerId} />
          </div>
        </Suspense>
      </div>
      <Suspense
        fallback={
          <div className="flex grow flex-col items-center justify-between gap-10 lg:justify-start">
            <div className="relative mb-auto mt-auto aspect-square w-full max-w-sm animate-pulse rounded-full bg-shark object-cover lg:mb-0 lg:mt-0" />
            <div className="flex w-full flex-col items-center gap-10">
              <div className="flex flex-col items-center gap-2.5">
                <AppSkeletonWrapper>
                  <span className="invisible text-center text-2xl font-bold sm:text-4xl md:text-6xl">
                    Lorem ipsum dolor
                  </span>
                </AppSkeletonWrapper>
                <AppSkeletonWrapper>
                  <span className="invisible text-base lg:text-xl">
                    {t('TRAINERS_PAGE_SERVICE_NAME')}
                    <span className="font-bold">25 zł</span>
                  </span>
                </AppSkeletonWrapper>
              </div>
              <AppSkeletonButton>{t('TRAINERS_PAGE_BUY_BUTTON')}</AppSkeletonButton>
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
