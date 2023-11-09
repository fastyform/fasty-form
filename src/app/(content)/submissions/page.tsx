import { Suspense } from 'react';
import FilterTabs from './_components/filter-tabs';
import SubmissionCardSkeleton from './_components/submission-card/submissions-skeleton';
import Submissions from './_components/submissions';

const SubmissionsPage = ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const key = JSON.stringify(searchParams);

  return (
    <>
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
