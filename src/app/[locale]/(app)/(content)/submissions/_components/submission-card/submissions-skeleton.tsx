import { SubmissionsGridWrapper } from '@/app/[locale]/(app)/(content)/submissions/_components/submissions';
import { SubmissionCardContainer } from './submission-card';

const SubmissionCardSkeleton = () => (
  <SubmissionCardContainer>
    <div className="relative h-60 w-full animate-pulse rounded-xl bg-bunker min-[450px]:h-40 lg:h-60" />
    <div className="w-full animate-pulse rounded-full bg-bunker">
      <h5 className="invisible animate-pulse select-none text-sm font-bold text-white lg:text-xl">Lorem </h5>
    </div>
    <div className="w-full animate-pulse select-none rounded-full bg-yellow-400 py-[10px] text-center text-xs font-bold text-yellow-400 lg:text-base">
      Lorem Ips
    </div>
  </SubmissionCardContainer>
);

const SubmissionsSkeleton = () => (
  <SubmissionsGridWrapper>
    {[1, 2, 3, 4].map((key) => (
      <SubmissionCardSkeleton key={key} />
    ))}
  </SubmissionsGridWrapper>
);

export default SubmissionsSkeleton;
