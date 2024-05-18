import { ReactNode, Suspense } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import MobileNavbar from '@/components/app-navbar/mobile-navbar/mobile-navbar';
import { Locale } from '@/utils/constants';
import PublicDesktopNavbar from './_components/public-desktop-navbar';
import PublicNavbarItems from './_components/public-navbar-items';

const PublicLayout = ({ children, params: { locale } }: { children: ReactNode; params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <PublicDesktopNavbar />
      <MobileNavbar className="left-0 top-0 h-[--public-mobile-navbar-height]" logoHref="/">
        <hr className="border-zinc-400/30" />
        <Suspense>
          <PublicNavbarItems />
        </Suspense>
      </MobileNavbar>
      {children}
    </>
  );
};

export default PublicLayout;
