import { ReactNode } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import AuthFooter from '@/app/[locale]/(auth)/_components/auth-footer';
import PublicContainer from '@/app/[locale]/(public)/_components/public-container';
import PublicNavbar from '@/app/[locale]/(public)/_components/public-desktop-navbar';
import PublicNavbarPlaceholder from '@/app/[locale]/(public)/_components/public-navbar-placeholder';
import { Locale } from '@/utils/constants';

const LegalSupportLayout = ({ children, params: { locale } }: { children: ReactNode; params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="min-h-screen-responsive flex flex-col text-white">
      <PublicNavbar />
      <PublicNavbarPlaceholder />
      <PublicContainer>
        <PublicContainer.Content className="flex-col gap-5 py-10 md:gap-10 [&_ol]:list-decimal [&_ol]:p-4">
          {children}
        </PublicContainer.Content>
      </PublicContainer>
      <PublicContainer>
        <PublicContainer.Content className="gap-5 py-5 ">
          <AuthFooter />
        </PublicContainer.Content>
      </PublicContainer>
    </div>
  );
};

export default LegalSupportLayout;
