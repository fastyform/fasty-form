import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Constants, { COMPANY_INFO, Locale, LocaleComponents } from '@/utils/constants';
import TosPL from './translations/pl.mdx';

const components: LocaleComponents = {
  pl: TosPL,
};

const TermsOfServicePage = ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);
  const Component = components[locale];

  const t = useTranslations();

  return (
    <>
      <h1 className="text-2xl font-bold">
        {t('TOS_TITLE')} <span className="text-yellow-400">{Constants.APP_NAME}</span>
      </h1>

      <div className="flex flex-col gap-5">
        <h2 className="text-2xl">{t('TOS_DEFINITION')}</h2>
        <p>
          <strong>{t('TOS_OWNER')}:</strong> {COMPANY_INFO}
        </p>
        <p>
          <strong>{t('TOS_APP')}:</strong> {Constants.APP_NAME}
        </p>
      </div>
      <Component />
    </>
  );
};

export default TermsOfServicePage;
