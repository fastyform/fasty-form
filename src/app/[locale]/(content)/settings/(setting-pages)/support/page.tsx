import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import AppButton from '@/components/app-button';
import { Locale } from '@/utils/constants';

const SupportPage = ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

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
