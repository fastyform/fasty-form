import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Providers from '@/app/[locale]/providers';
import Constants, { Locale, LOCALES, PRODUCTION_ORIGIN_URL } from '@/utils/constants';
import theme from '@/utils/theme';
import NextIntlProvider from './next-intl-provider';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta-sans' });

export const metadata: Metadata = {
  title: `${Constants.APP_NAME} - sprawdź swoją technikę`,
  description: `${Constants.APP_NAME} - szybko sprawdź swoją technikę przy pomocy trenera`,
  applicationName: Constants.APP_NAME,
  metadataBase: new URL(Constants.ORIGIN_URL),
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
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

const RootLayout = ({ children, params: { locale } }: { children: React.ReactNode; params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={plusJakartaSans.className} id="body">
        <NextIntlProvider locale={locale} messages={messages}>
          <ToastContainer toastClassName="bg-bunker border-gray-600 border rounded-lg" />
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Providers>
                <div className="min-h-screen-responsive w-full bg-bunker">{children}</div>
              </Providers>
            </ThemeProvider>
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

export default RootLayout;
