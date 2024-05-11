import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import SettingsMenu from '@/app/[locale]/(content)/settings/_components/settings-menu';
import MobileNavbarLink from '@/components/app-navbar/mobile-navbar/mobile-navbar-link';
import { Locale } from '@/utils/constants';

const SettingPagesLayout = ({ children, params: { locale } }: { children: ReactNode; params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div className="flex lg:gap-10 xl:gap-20 2xl:gap-40">
      <div className="hidden w-full lg:block lg:max-w-[350px]">
        <h1 className="text-2xl text-white">{t('SETTINGS_TITLE')}</h1>
        <SettingsMenu />
      </div>
      <div className="flex grow flex-col gap-5">
        <MobileNavbarLink aria-label={t('NAV_SETTINGS')} className="lg:hidden" href="/settings" icon="back" />
        {children}
      </div>
    </div>
  );
};

export default SettingPagesLayout;
