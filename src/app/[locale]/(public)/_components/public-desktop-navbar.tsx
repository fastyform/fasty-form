import Link from 'next/link';
import { useTranslations } from 'next-intl';
import AppButton from '@/components/app-button';
import AppLogo from '@/components/app-logo';
import Constants from '@/utils/constants';

const PublicNavbar = () => {
  const t = useTranslations();

  return (
    <header className="fixed top-0 z-50 flex h-[--public-mobile-navbar-height] w-full items-center justify-center border-b border-gray-600 bg-shark px-5 md:h-[--public-desktop-navbar-height]">
      <div className="flex w-full max-w-screen-xl items-center justify-between">
        <AppLogo className="w-[100px]" href="/" />
        <AppButton href="/submissions" LinkComponent={Link} size="small" variant="contained">
          {t('PUBLIC_NAVBAR_GO_TO_APP_BUTTON')} {Constants.APP_NAME}
        </AppButton>
      </div>
    </header>
  );
};

export default PublicNavbar;
