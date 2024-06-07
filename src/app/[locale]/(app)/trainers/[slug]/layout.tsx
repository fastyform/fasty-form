import { ReactNode, Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import AppSkeletonButton from '@/components/app-skeleton/app-skeleton-button';
import AppSkeletonWrapper from '@/components/app-skeleton/app-skeleton-wrapper';
import { Locale } from '@/utils/constants';

const TrainerPageLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string; locale: Locale };
}) => {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations();

  return (
    <section className="z-0 mx-auto flex w-full max-w-screen-2xl flex-col justify-between pb-24 pt-[--public-mobile-navbar-height] lg:h-auto lg:px-5 lg:pb-12 lg:pt-28">
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
    </section>
  );
};

export default TrainerPageLayout;
