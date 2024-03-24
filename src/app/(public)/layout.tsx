import { ReactNode, Suspense } from 'react';
import MobileNavbar from '@/components/app-navbar/mobile-navbar/mobile-navbar';
import DesktopNavbarHome from './(home)/_components/desktop-navbar-home';
import HomeNavbarItems from './(home)/_components/home-navbar-items';

const HomeLayout = ({ children }: { children: ReactNode }) => (
  <>
    <DesktopNavbarHome />
    <MobileNavbar className="sticky left-0 top-0">
      <hr className="border-zinc-400/30" />
      <Suspense>
        <HomeNavbarItems />
      </Suspense>
    </MobileNavbar>
    {children}
  </>
);

export default HomeLayout;
