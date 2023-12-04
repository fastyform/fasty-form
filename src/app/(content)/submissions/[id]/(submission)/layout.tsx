import { ReactNode, Suspense } from 'react';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import StatusBadge from '@/app/(content)/submissions/_components/status-badge';
import {
  SubmissionStatusBadge,
  SubmissionTrainerName,
  SubmissionUpdateDate,
} from './_components/submissions-layout-parts';

const SubmissionLayout = async ({ children, params }: { children: ReactNode; params: { id: string } }) => (
  <>
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-5">
        <MobileNavbarLink aria-label="Zgłoszenia" href="/submissions" icon="back" />
        <Suspense
          fallback={
            <div className="hidden animate-pulse select-none rounded-full bg-[#1E2226] text-xl lg:block">
              <span className="invisible font-bold">Ostatnia zmiana: </span>
              <span className="invisible capitalize">01.04.2001</span>
            </div>
          }
        >
          <SubmissionUpdateDate submissionId={params.id} />
        </Suspense>
      </div>

      <div className="flex items-center gap-5">
        <Suspense
          fallback={
            <div className="hidden animate-pulse select-none rounded-xl bg-[#1E2226] text-xl lg:block">
              <span className="invisible">Trener: </span>
              <span className="invisible font-bold">Jan Kowalski</span>
            </div>
          }
        >
          <SubmissionTrainerName submissionId={params.id} />
        </Suspense>
        <Suspense fallback={<StatusBadge type="skeleton" />}>
          <SubmissionStatusBadge submissionId={params.id} />
        </Suspense>
      </div>
    </div>
    {children}
  </>
);

export default SubmissionLayout;
