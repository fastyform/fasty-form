import { useTranslations } from 'next-intl';
import SettingsMenu from './_components/settings-menu';

const SettingsPage = () => {
  const t = useTranslations();

  return (
    <div className="flex lg:gap-10 xl:gap-20 2xl:gap-40">
      <div className="w-full lg:max-w-[350px]">
        <h1 className="text-2xl text-white">{t('SETTINGS_TITLE')}</h1>
        <SettingsMenu />
      </div>
    </div>
  );
};

export default SettingsPage;
