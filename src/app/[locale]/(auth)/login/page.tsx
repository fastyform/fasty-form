import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import SplitPageWithImage from '@/app/[locale]/(auth)/_components/split-page-with-image';
import AuthLink from '@/components/auth-link';
import Constants, { Locale } from '@/utils/constants';
import { SearchParams } from '@/utils/types';
import LoginForm from './_components/login-form';

export const metadata: Metadata = {
  title: `Logowanie - ${Constants.APP_NAME}`,
  description: `Zaloguj się do swojego konta ${Constants.APP_NAME}, aby korzystać z pełnej gamy usług analizy techniki.`,
};

const LoginPage = ({
  searchParams,
  params: { locale },
}: {
  searchParams: SearchParams;
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);

  return (
    <SplitPageWithImage
      imageProps={{ alt: 'Uśmiechnięci ludzie na siłowni.', src: '/login.jpg', className: 'opacity-60' }}
    >
      <h1 className="text-2xl font-bold text-white">Zaloguj się</h1>
      <div className="flex flex-col gap-4">
        <LoginForm redirectUrlParam={searchParams.redirectUrl} />
        <AuthLink href="/register/client" redirectUrlParam={searchParams.redirectUrl}>
          Nie masz konta? <span className="font-bold text-yellow-400">Zarejestruj się</span>
        </AuthLink>
      </div>
    </SplitPageWithImage>
  );
};

export default LoginPage;
