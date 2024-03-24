import { Suspense } from 'react';
import AppLogo from '@/components/app-logo';
import PublicNavbarItems from './public-navbar-items';

const PublicDesktopNavbar = () => (
  <header className="sticky top-0 z-50 hidden h-[68px] w-full items-center justify-center border-b border-gray-600 bg-shark px-5 lg:flex">
    <div className="flex w-full max-w-screen-xl items-center justify-between">
      <AppLogo className="w-[100px]" href="/" />
      <div className="flex h-full items-center">
        <Suspense>
          <PublicNavbarItems />
        </Suspense>
      </div>
    </div>
  </header>
);

export default PublicDesktopNavbar;
