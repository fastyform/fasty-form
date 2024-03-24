import { ReactNode } from 'react';
import AuthFooter from '@/app/(auth)/_components/auth-footer';
import { Container } from '@/app/(public)/_components/container';

const LegalSupportLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen-responsive flex flex-col text-white">
    <Container>
      <Container.Content className="flex-col gap-5 py-10 md:gap-10">{children}</Container.Content>
    </Container>
    <Container>
      <Container.Content className="gap-5 py-5 ">
        <AuthFooter />
      </Container.Content>
    </Container>
  </div>
);

export default LegalSupportLayout;
