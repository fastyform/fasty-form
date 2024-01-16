import { ToastContainer } from 'react-toastify';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import CookiesModal from '@/components/cookies-modal';
import Constants from '@/utils/constants';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta-sans' });

export const metadata: Metadata = {
  title: `${Constants.APP_NAME} - sprawdź swoją technikę`,
  description: `${Constants.APP_NAME} - szybko sprawdź swoją technikę przy pomocy trenera`,
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
