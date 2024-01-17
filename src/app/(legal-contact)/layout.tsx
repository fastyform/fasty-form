import { ReactNode, Suspense } from 'react';
import BackLink from './_components/back-link';

const LegalSupportLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen-responsive flex flex-col">
    <div className="ml-auto mr-auto flex w-full max-w-screen-2xl flex-col gap-5 px-5 py-10 text-white md:gap-10">
      <Suspense
        fallback={
          <div className="w-fit animate-pulse select-none rounded-full bg-shark px-5 text-xl">
            <span className="invisible">Powrót</span>
          </div>
        }
      >
        <BackLink />
      </Suspense>
      {children}
    </div>
  </div>
);

export default LegalSupportLayout;
