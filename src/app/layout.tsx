import { ToastContainer } from 'react-toastify';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { cookies } from 'next/headers';
import Analytics from './_components/analytics';
import CookiesModal from './_components/cookies-modal';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta-sans' });

export const metadata: Metadata = {
  title: 'FastyForm - sprawdź swoją technikę',
  description: 'FastyForm - szybko sprawdź swoją technikę przy pomocy trenera',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const cookiesConsent = cookies().get('cookiesConsent');

  return (
    <html lang="pl">
      <body className={plusJakartaSans.className} id="body">
        <ToastContainer toastClassName="bg-[#0D1116] border-gray-600 border rounded-lg" />
        <CookiesModal cookiesConsent={cookiesConsent} />
        <Analytics />
        <div className="min-h-screen-responsive w-full bg-[#0D1116]">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
