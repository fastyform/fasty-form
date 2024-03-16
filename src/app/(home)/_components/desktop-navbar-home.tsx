import { Suspense } from 'react';
import AppLogo from '@/components/app-logo';
import HomeNavbarItems from './home-navbar-items';

const DesktopNavbarHome = () => (
  <header className="fixed left-1/2 z-50 hidden h-[68px] w-full -translate-x-1/2 items-center justify-center border-b border-gray-600 bg-shark px-5 lg:flex">
    <div className="flex w-full max-w-screen-xl items-center justify-between">
      <AppLogo className="w-[100px]" />
      <div className="flex h-full items-center">
        <Suspense>
          <HomeNavbarItems />
        </Suspense>
      </div>
    </div>
  </header>
);

export default DesktopNavbarHome;
