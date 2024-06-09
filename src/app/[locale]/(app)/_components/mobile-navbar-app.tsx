import { getTranslations } from 'next-intl/server';

import AppLogo from '@/components/app-logo';
import navbarIcons from '@/components/app-navbar/assets/navbar-icons';
import NavbarLink from '@/components/app-navbar/navbar-link';
import NavbarContent from './navbar-content';

const MobileNavbarApp = async () => {
  const t = await getTranslations();
  const FeedbackIcon = navbarIcons.feedback;

  return (
    <>
      <header className="fixed left-0 top-0 z-30 flex h-[--public-mobile-navbar-height] w-full items-center justify-between gap-4 border-b border-solid border-gray-600 bg-shark px-5 lg:hidden">
        <AppLogo className="w-[100px]" href="/submissions" />
        <NavbarLink href="/feedback" variant="contained">
          <FeedbackIcon />
          {t('NAV_FEEDBACK')}
        </NavbarLink>
      </header>
      <nav className="fixed bottom-0 left-0 z-30 flex h-[--public-mobile-navbar-height] w-full items-center justify-around gap-2.5 border-t border-solid border-gray-600 bg-shark px-5 lg:hidden">
        <NavbarContent />
      </nav>
    </>
  );
};

export default MobileNavbarApp;
