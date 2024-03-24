import { ReactNode, Suspense } from 'react';
import MobileNavbar from '@/components/app-navbar/mobile-navbar/mobile-navbar';
import PublicDesktopNavbar from './_components/public-desktop-navbar';
import PublicNavbarItems from './_components/public-navbar-items';

const PublicLayout = ({ children }: { children: ReactNode }) => (
  <>
    <PublicDesktopNavbar />
    <MobileNavbar className="sticky left-0 top-0">
      <hr className="border-zinc-400/30" />
      <Suspense>
        <PublicNavbarItems />
      </Suspense>
    </MobileNavbar>
    {children}
  </>
);

export default PublicLayout;
