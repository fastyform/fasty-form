import Link from 'next/link';
import { useTranslations } from 'next-intl';

const LegalPage = () => {
  const t = useTranslations();

  return (
    <>
      <h1 className="text-2xl text-white">{t('SETTINGS_LEGAL_TITLE')}</h1>
      <Link className="text-sm text-white" href="/terms-of-service">
        {t('COMMON_TOS')}
      </Link>
      <Link className="text-sm text-white" href="/privacy-policy">
        {t('COMMON_PRIVACY_POLICY')}
      </Link>
      <Link className="text-sm text-white" href="/cookies">
        {t('COMMON_COOKIES')}
      </Link>
    </>
  );
};

export default LegalPage;
