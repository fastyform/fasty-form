import SplitPageWithImage from '@/app/(auth)/_components/split-page-with-image';
import AuthLink from '@/app/_components/auth-link';
import { SearchParams } from '@/utils/types';
import ForgotPasswordForm from './_components/forgot-password-form';

const ForgotPasswordPage = ({ searchParams }: { searchParams: SearchParams }) => (
  <SplitPageWithImage imageProps={{ alt: 'Hantle na siłowni', src: '/forgot-password.png' }}>
    <h1 className="text-2xl font-bold text-white">Zapomniałeś hasła?</h1>

    <ForgotPasswordForm redirectUrlParam={searchParams.redirectUrl} />
    <AuthLink href="/login" redirectUrlParam={searchParams.redirectUrl}>
      Pamiętasz hasło? <span className="font-bold text-yellow-400">Zaloguj się</span>
    </AuthLink>
  </SplitPageWithImage>
);

export default ForgotPasswordPage;
