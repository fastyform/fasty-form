import { Metadata } from 'next';
import SplitPageWithImage from '@/app/(auth)/_components/split-page-with-image';
import AuthLink from '@/components/auth-link';
import Constants from '@/utils/constants';
import { SearchParams } from '@/utils/types';
import ForgotPasswordForm from './_components/forgot-password-form';

export const metadata: Metadata = {
  title: `Zresetuj Hasło - ${Constants.APP_NAME}`,
  description: `Zapomniałeś hasła do ${Constants.APP_NAME}? Bez obaw, łatwo zresetujesz swoje hasło, aby kontynuować korzystanie z naszych usług.`,
};

const ForgotPasswordPage = ({ searchParams }: { searchParams: SearchParams }) => (
  <SplitPageWithImage imageProps={{ alt: 'Hantle na siłowni', src: '/forgot-password.png' }}>
    <h1 className="text-2xl font-bold text-white">Zapomniałeś hasła?</h1>

    <ForgotPasswordForm redirectPathParam={searchParams.redirectUrl} />
    <AuthLink href="/login" redirectUrlParam={searchParams.redirectUrl}>
      Pamiętasz hasło? <span className="font-bold text-yellow-400">Zaloguj się</span>
    </AuthLink>
  </SplitPageWithImage>
);

export default ForgotPasswordPage;
