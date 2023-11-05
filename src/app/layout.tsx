import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta-sans' });

export const metadata: Metadata = {
  title: 'FastForm - sprawdź swoją technikę',
  description: 'FastForm - szybko sprawdź swoją technikę przy pomocy trenera',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={plusJakartaSans.className} id="body">
      <div className="h-full w-full bg-[#0D1116]">{children}</div>
    </body>
  </html>
);

export default RootLayout;
