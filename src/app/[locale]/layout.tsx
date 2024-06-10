import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { GoogleTagManager } from '@next/third-parties/google';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useMessages } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Providers from '@/app/[locale]/providers';
import Constants, { Locale, LOCALES, PRODUCTION_ORIGIN_URL } from '@/utils/constants';
import NextIntlProvider from './next-intl-provider';
import 'dayjs/locale/pl';

dayjs.extend(relativeTime);
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta-sans' });

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale });

  return {
    title: `${Constants.APP_NAME} ${t('COMMON_META_TITLE')}`,
    description: `${Constants.APP_NAME} ${t('COMMON_META_DESCRIPTION')}`,
    applicationName: Constants.APP_NAME,
    metadataBase: new URL(Constants.ORIGIN_URL),
    openGraph: {
      type: 'website',
      locale,
      url: PRODUCTION_ORIGIN_URL,
      siteName: Constants.APP_NAME,
      images: [
        {
          url: 'https://veknudpszbrjutmcmrwk.supabase.co/storage/v1/object/public/assets/og-logo',
          width: 1200,
          height: 630,
          alt: Constants.APP_NAME,
        },
      ],
    },
  };
}

const AppLayout = ({ children, params: { locale } }: { children: ReactNode; params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);
  dayjs.locale(locale);
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={plusJakartaSans.className} id="body">
        <NextIntlProvider locale={locale} messages={messages}>
          <ToastContainer toastClassName="bg-bunker border-gray-600 border rounded-lg" />
          <AppRouterCacheProvider>
            <Providers locale={locale}>{children}</Providers>
          </AppRouterCacheProvider>
        </NextIntlProvider>
      </body>
      {process.env.NODE_ENV !== 'development' && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />}
    </html>
  );
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default AppLayout;
