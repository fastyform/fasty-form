import Link from 'next/link';
import { useTranslations } from 'next-intl';
import AppButton from '@/components/app-button';

const SupportPage = () => {
  const t = useTranslations();

  return (
    <>
      <h1 className="text-2xl text-white">{t('SETTINGS_SUPPORT_TITLE')}</h1>
      <AppButton classes={{ root: 'py-2.5 self-start text-sm sm:text-base' }} href="/contact" LinkComponent={Link}>
        {t('SETTINGS_SUPPORT_DESCRIPTION')}
      </AppButton>
    </>
  );
};

export default SupportPage;
