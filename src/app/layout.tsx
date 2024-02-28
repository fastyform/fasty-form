import { ToastContainer } from 'react-toastify';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Constants, { PRODUCTION_ORIGIN_URL } from '@/utils/constants';
import Providers from './providers';

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

const RootLayout = async ({ children }: { children: React.ReactNode }) => (
  <html lang="pl">
    <body className={plusJakartaSans.className} id="body">
      <ToastContainer toastClassName="bg-bunker border-gray-600 border rounded-lg" />
      <Providers>
        <div className="min-h-screen-responsive w-full bg-bunker">{children}</div>
      </Providers>
    </body>
    <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
  </html>
);

export default RootLayout;
