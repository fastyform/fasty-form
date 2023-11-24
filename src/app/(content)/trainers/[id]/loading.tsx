import SkeletonButton from '@/components/skeletons/skeleton-button';
import SkeletonWrapper from '@/components/skeletons/skeleton-wrapper';

const LoadingTrainerProfilePage = () => (
  <div className="flex grow flex-col items-center justify-between gap-10 lg:justify-start">
    <div className="relative mb-auto mt-auto aspect-square w-full max-w-sm animate-pulse rounded-full bg-[#1e2226] object-cover lg:mb-0 lg:mt-0" />

    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2.5">
        <SkeletonWrapper>
          <span className="invisible text-2xl font-bold sm:text-4xl md:text-6xl">Jan Kowalski</span>
        </SkeletonWrapper>
        <SkeletonWrapper>
          <span className="invisible text-base lg:text-xl">
            Analiza techniki jednego wideo - <span className="font-bold">25zł </span>
          </span>
        </SkeletonWrapper>
      </div>
      <SkeletonButton>Kup analizę techniki</SkeletonButton>
    </div>
  </div>
);

export default LoadingTrainerProfilePage;
