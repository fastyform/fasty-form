import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Constants, { Locale, LocaleComponents } from '@/utils/constants';
import PrivacyPL from './translations/pl.mdx';

const components: LocaleComponents = {
  pl: PrivacyPL,
};

const PrivacyPolicyPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);
  const Component = components[locale];

  const t = await getTranslations();

  return (
    <>
      <h1 className="text-2xl font-bold">
        {t('PRIVACY_POLICY_PAGE_TITLE')} <span className="text-yellow-400">{Constants.APP_NAME}</span>
      </h1>
      <Component />
    </>
  );
};

export default PrivacyPolicyPage;
