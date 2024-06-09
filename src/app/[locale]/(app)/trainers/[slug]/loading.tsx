'use client';

import ContentLayoutContainer from '@/app/[locale]/(app)/_components/content-layout-container';
import AppSkeletonButton from '@/components/app-skeleton/app-skeleton-button';
import AppSkeletonWrapper from '@/components/app-skeleton/app-skeleton-wrapper';

const TrainerPageLoading = () => (
  <>
    <ContentLayoutContainer>
      <div className="flex grow flex-col items-center gap-5 lg:justify-start">
        <AppSkeletonWrapper className="aspect-square w-full max-w-sm rounded-full" />
        <div className="flex w-full max-w-[500px] flex-col gap-5">
          <div className="flex gap-2.5">
            {[...Array(4).keys()].map((key) => (
              <AppSkeletonWrapper key={key} className="size-[54px] rounded-full" />
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
            <AppSkeletonWrapper className="h-[48px] w-full max-w-[300px]" />
            <AppSkeletonWrapper className="h-[96px] w-full" />
          </div>
          <AppSkeletonButton className="hidden h-[60px] lg:block" />
        </div>
      </div>
    </ContentLayoutContainer>
    <AppSkeletonButton className="h-[60px] rounded-none lg:hidden" />
  </>
);

export default TrainerPageLoading;
