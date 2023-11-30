import { ToastContainer } from 'react-toastify';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';
import getUserFromSession from '@/utils/get-user-from-session';
import checkIsUserOnboardedStripe from './(content)/_utils/check-is-user-onboarded-stripe';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta-sans' });

export const metadata: Metadata = {
  title: 'FastForm - sprawdź swoją technikę',
  description: 'FastForm - szybko sprawdź swoją technikę przy pomocy trenera',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="pl">
    <body className={plusJakartaSans.className} id="body">
      <ToastContainer toastClassName="bg-[#0D1116] border-gray-600 border rounded-lg" />
      <div className="min-h-screen w-full bg-[#0D1116]">{children}</div>
    </body>
  </html>
);

export default RootLayout;
