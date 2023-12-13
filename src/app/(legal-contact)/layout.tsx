import { ReactNode } from 'react';
import BackLink from './_components/back-link';

const LegalSupportLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col">
    <div className="ml-auto mr-auto flex w-full max-w-screen-2xl flex-col gap-5 px-5 py-10 text-white md:gap-10">
      <BackLink />
      {children}
    </div>
  </div>
);

export default LegalSupportLayout;
