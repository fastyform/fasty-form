import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Constants, { Locale, LocaleComponents } from '@/utils/constants';
import AmbassadorPL from './translations/pl.mdx';

const components: LocaleComponents = {
  pl: AmbassadorPL,
};

const AmbassadorProgram = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);
  const Component = components[locale];

  const t = await getTranslations();

  return (
    <>
      <h1 className="text-2xl font-bold">
        {t('AMBASSADOR_TOS_PAGE_TITLE')} <span className="text-yellow-400">{Constants.APP_NAME}</span>
      </h1>
      <Component />
    </>
  );
};

export default AmbassadorProgram;
