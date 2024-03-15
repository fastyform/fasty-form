import { ReactNode, Suspense } from 'react';
import DesktopNavbar from '@/app/(content)/_components/navbar/desktop-navbar/desktop-navbar';
import HomeNavbarItems from './_components/home-navbar-items';

const HomeLayout = ({ children }: { children: ReactNode }) => (
  <>
    <DesktopNavbar className="fixed left-1/2 -translate-x-1/2" innerContainerClassName="max-w-screen-xl">
      <Suspense>
        <HomeNavbarItems />
      </Suspense>
    </DesktopNavbar>
    {children}
  </>
);

export default HomeLayout;
