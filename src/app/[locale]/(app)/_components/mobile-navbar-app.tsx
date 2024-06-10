import { getTranslations } from 'next-intl/server';

import AppLogo from '@/components/app-logo';
import navbarIcons from '@/components/app-navbar/assets/navbar-icons';
import NavbarLink from '@/components/app-navbar/navbar-link';

const MobileNavbarApp = async () => {
  const t = await getTranslations();
  const FeedbackIcon = navbarIcons.feedback;

  return (
    <header className="z-30 flex h-[60px] w-full shrink-0 items-center justify-between gap-4 border-b border-solid border-gray-600 bg-shark px-5 lg:hidden">
      <AppLogo className="w-[100px]" href="/submissions" />
      <NavbarLink href="/feedback" variant="contained">
        <FeedbackIcon />
        {t('NAV_FEEDBACK')}
      </NavbarLink>
    </header>
  );
};

export default MobileNavbarApp;
