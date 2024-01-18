import { ToastContainer } from 'react-toastify';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import CookiesModal from '@/components/cookies-modal';
import Constants, { PRODUCTION_ORIGIN_URL } from '@/utils/constants';

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
      <CookiesModal />
      <div className="min-h-screen-responsive w-full bg-bunker">{children}</div>
    </body>
  </html>
);

export default RootLayout;
