import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Locale } from '@/utils/constants';
import CookiesDeclaration from './cookies-declaration';

const Cookies = ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <div className="order-2 flex flex-1 flex-col gap-5 md:order-1">
        <h1 className="text-2xl font-bold">{t('COOKIES_TITLE')}</h1>
        <Script src="https://consent.cookiebot.com/uc.js?cbid=af9bc4d6-f7c9-4a4d-8b4f-3ace3e37cf8f" />
        <CookiesDeclaration locale={locale} />
      </div>
    </div>
  );
};

export default Cookies;
