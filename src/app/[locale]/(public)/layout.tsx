import { ReactNode } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Locale } from '@/utils/constants';
import PublicNavbar from './_components/public-desktop-navbar';

const PublicLayout = ({ children, params: { locale } }: { children: ReactNode; params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="min-h-screen-responsive w-full">
      <PublicNavbar />
      {children}
    </div>
  );
};

export default PublicLayout;
