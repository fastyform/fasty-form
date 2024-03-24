import { ReactNode } from 'react';
import AuthFooter from '@/app/(auth)/_components/auth-footer';
import PublicContainer from '@/app/(public)/_components/public-container';
import PublicNavbarPlaceholder from '@/app/(public)/_components/public-navbar-placeholder';

const LegalSupportLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen-responsive flex flex-col text-white">
    <PublicNavbarPlaceholder />
    <PublicContainer>
      <PublicContainer.Content className="flex-col gap-5 py-10 md:gap-10">{children}</PublicContainer.Content>
    </PublicContainer>
    <PublicContainer>
      <PublicContainer.Content className="gap-5 py-5 ">
        <AuthFooter />
      </PublicContainer.Content>
    </PublicContainer>
  </div>
);

export default LegalSupportLayout;
