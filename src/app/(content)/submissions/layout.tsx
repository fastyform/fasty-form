import { ReactNode } from 'react';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import AppLogo from '@/components/app-logo';

const SubmissionLayout = ({ children }: { children: ReactNode }) => (
  <section>
    <div className="align-center my-5 flex w-full justify-between lg:invisible">
      <AppLogo />
      <MobileNavbarLink aria-label="Ustawienia" href="/settings" icon="settings" />
    </div>
    {children}
  </section>
);

export default SubmissionLayout;
