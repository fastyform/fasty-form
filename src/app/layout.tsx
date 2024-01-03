import { ToastContainer } from 'react-toastify';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Constants from '@/utils/constants';
import Analytics from './_components/analytics';
import CookiesModal from './_components/cookies-modal';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta-sans' });

export const metadata: Metadata = {
  title: `${Constants.APP_NAME} - sprawdź swoją technikę`,
  description: `${Constants.APP_NAME} - szybko sprawdź swoją technikę przy pomocy trenera`,
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => (
  <html lang="pl">
    <body className={plusJakartaSans.className} id="body">
      <ToastContainer toastClassName="bg-[#0D1116] border-gray-600 border rounded-lg" />
      <CookiesModal />
      <Analytics />
      <div className="min-h-screen-responsive w-full bg-[#0D1116]">{children}</div>
    </body>
  </html>
);

export default RootLayout;
