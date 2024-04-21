import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import Constants, { LOCALES } from './utils/constants';

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    defaultTranslationValues: {
      NewLine: () => <br />,
      Yellow: (chunks) => <span className="text-yellow-400">{chunks}</span>,
      Strong: (chunks) => <strong>{chunks}</strong>,
      AppName: () => Constants.APP_NAME,
    },
    timeZone: 'Europe/Warsaw',
  };
});
