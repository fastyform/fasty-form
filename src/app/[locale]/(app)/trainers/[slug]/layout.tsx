import { ReactNode, Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ContentLayoutContainer from '@/app/[locale]/(app)/_components/content-layout-container';
import AppSkeletonButton from '@/components/app-skeleton/app-skeleton-button';
import AppSkeletonWrapper from '@/components/app-skeleton/app-skeleton-wrapper';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import { Locale } from '@/utils/constants';
import getUserWithNull from '@/utils/get-user-with-null';
import { groszToPLN } from '@/utils/stripe';
import BuyButton from './_components/buy-button';
import getTrainerDetailsBySlug from './_utils/get-trainer-details-by-slug';

const TrainerPageSkeleton = () => (
  <div className="flex grow flex-col items-center justify-between gap-10 lg:justify-start">
    <div className="relative mb-auto mt-auto aspect-square w-full max-w-sm animate-pulse rounded-full bg-shark object-cover lg:mb-0 lg:mt-0" />
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2.5">
        <AppSkeletonWrapper>
          <span className="invisible text-center text-2xl font-bold sm:text-4xl md:text-6xl">Lorem ipsum dolor</span>
        </AppSkeletonWrapper>
        <AppSkeletonWrapper>
          <span className="invisible text-base lg:text-xl">
            TRAINERS_PAGE_SERVICE_NAME
            <span className="font-bold">25 zł</span>
          </span>
        </AppSkeletonWrapper>
      </div>
      <AppSkeletonButton>TRAINERS_PAGE_BUY_BUTTON</AppSkeletonButton>
    </div>
  </div>
);

interface TrainerPageLayoutProps {
  children: ReactNode;
  params: { slug: string; locale: Locale };
}

const TrainerPageLayout = async ({ children, params }: TrainerPageLayoutProps) => {
  unstable_setRequestLocale(params.locale);
  const [user, { user_id, service_price_in_grosz }, t] = await Promise.all([
    getUserWithNull(),
    getTrainerDetailsBySlug(params.slug),
    getTranslations(),
  ]);
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;

  if (!service_price_in_grosz) {
    throw new Error();
  }

  return (
    <>
      <ContentLayoutContainer>
        <Suspense fallback={<TrainerPageSkeleton />}>{children}</Suspense>
      </ContentLayoutContainer>
      <BuyButton className="rounded-none lg:hidden" disabled={isTrainerAccount} size="large" trainerId={user_id}>
        {isTrainerAccount ? (
          t('TRAINERS_PAGE_BUY_BUTTON_TRAINER')
        ) : (
          <span>
            {t('TRAINERS_PAGE_BUY_BUTTON')} - {groszToPLN(service_price_in_grosz)} {t('CURRENCY_PLN')}
          </span>
        )}
      </BuyButton>
    </>
  );
};

export default TrainerPageLayout;
