import { SubmissionsGridWrapper } from '@/app/(content)/submissions/_components/submissions';
import { SubmissionCardContainer } from './submission-card';

const SubmissionCardSkeleton = () => (
  <SubmissionCardContainer>
    <div className="relative h-60 w-full animate-pulse rounded-xl bg-[#0D1116] min-[450px]:h-40 lg:h-60" />
    <div className="w-full animate-pulse rounded-full bg-[#0D1116]">
      <h5 className="invisible animate-pulse select-none text-sm font-bold text-white lg:text-xl">Imię </h5>
    </div>
    <div className="w-full animate-pulse select-none rounded-full bg-yellow-400 py-[10px] text-center text-xs font-bold text-yellow-400 lg:text-base">
      Szczegóły
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
