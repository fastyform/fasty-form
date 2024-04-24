import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import SplitPageWithImage from '@/app/[locale]/(auth)/_components/split-page-with-image';
import RegisterForm from '@/app/[locale]/(auth)/register/_components/register-form';
import AuthLink from '@/components/auth-link';
import Constants, { Locale } from '@/utils/constants';
import { SearchParams } from '@/utils/types';

export const metadata: Metadata = {
  title: `Rejestracja Trenera - ${Constants.APP_NAME}`,
  description: `Zostań trenerem w ${Constants.APP_NAME}. Zarejestruj się, aby dzielić się swoją wiedzą i umiejętnościami.`,
};

const RegisterTrainerPage = ({
  searchParams,
  params: { locale },
}: {
  searchParams: SearchParams;
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);

  return (
    <SplitPageWithImage imageProps={{ alt: 'Ekwipunek na siłowni', src: '/trainer-register.jpg' }}>
      <div className="flex flex-col gap-2.5 text-center">
        <span className="font-bold text-zinc-400">Witaj w {Constants.APP_NAME}!</span>
        <h1 className="text-2xl text-white">
          Stań się trenerem <span className="font-medium text-yellow-400">przyszłości</span>,
          <br />
          analizuj, pomagaj, <span className="font-medium text-yellow-400">zarabiaj</span>
        </h1>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-white">
          Zarejestruj się jako <span className="text-yellow-400">trener</span>
        </h2>
        <RegisterForm redirectPathParam={searchParams.redirectUrl} userRole="trainer" />
      </div>
      <div className="flex flex-col gap-2">
        <AuthLink href="/register/client" redirectUrlParam={searchParams.redirectUrl}>
          Zarejestruj się jako <span className="font-bold text-yellow-400">klient</span>
        </AuthLink>
        <AuthLink href="/login" redirectUrlParam={searchParams.redirectUrl}>
          Posiadasz już konto? <span className="font-bold text-yellow-400">Zaloguj się</span>
        </AuthLink>
      </div>
    </SplitPageWithImage>
  );
};

export default RegisterTrainerPage;
