import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { INTL_TIMEZONE, LOCALES } from './utils/constants';
import defaultTranslationValues from './utils/default-translation-values';

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    defaultTranslationValues,
    timeZone: INTL_TIMEZONE,
  };
});
