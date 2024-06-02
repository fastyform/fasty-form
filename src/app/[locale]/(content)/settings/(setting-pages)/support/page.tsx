import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import AppButtonNew from '@/components/app-button-new';
import { Locale } from '@/utils/constants';

const SupportPage = ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <>
      <h1 className="text-2xl text-white">{t('SETTINGS_SUPPORT_TITLE')}</h1>
      <AppButtonNew className="self-start" href="/contact" LinkComponent={Link}>
        {t('SETTINGS_SUPPORT_DESCRIPTION')}
      </AppButtonNew>
    </>
  );
};

export default SupportPage;
