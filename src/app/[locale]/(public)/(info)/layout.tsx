import { ReactNode } from 'react';
import AuthFooter from '@/app/[locale]/(auth)/_components/auth-footer';
import PublicContainer from '@/app/[locale]/(public)/_components/public-container';
import PublicNavbarPlaceholder from '@/app/[locale]/(public)/_components/public-navbar-placeholder';

const LegalSupportLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen-responsive flex flex-col text-white">
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

export default LegalSupportLayout;
