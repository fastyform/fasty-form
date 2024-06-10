import { ReactNode } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Locale } from '@/utils/constants';

const AuthLayout = ({ children, params: { locale } }: { children: ReactNode; params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

  return <div className="min-h-screen-responsive w-full">{children}</div>;
};

export default AuthLayout;
