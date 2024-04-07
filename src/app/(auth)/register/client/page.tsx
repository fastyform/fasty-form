import { Metadata } from 'next';
import SplitPageWithImage from '@/app/(auth)/_components/split-page-with-image';
import RegisterForm from '@/app/(auth)/register/_components/register-form';
import AuthLink from '@/components/auth-link';
import Constants from '@/utils/constants';
import { SearchParams } from '@/utils/types';

export const metadata: Metadata = {
  title: `Rejestracja Klienta - ${Constants.APP_NAME}`,
  description: `Dołącz do ${Constants.APP_NAME} jako klient. Zarejestruj się, aby mieć dostęp do zakupu personalizowanych analiz techniki od Twojego ulubionego trenera.`,
};

const RegisterClientPage = ({ searchParams }: { searchParams: SearchParams }) => (
  <SplitPageWithImage imageProps={{ alt: 'Ekwipunek na siłowni', src: '/client-register.jpg' }}>
    <div className="flex flex-col gap-2.5 text-center">
      <span className="font-bold text-zinc-400">Witaj w {Constants.APP_NAME}!</span>
      <h1 className="text-2xl text-white">
        Trenuj jak <span className="font-medium text-yellow-400">zawodowiec</span>,
        <br />z techniką <span className="font-medium text-yellow-400">mistrza</span>
      </h1>
    </div>
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white">
        Zarejestruj się jako <span className="text-yellow-400">klient</span>
      </h2>
      <RegisterForm redirectPathParam={searchParams.redirectUrl} userRole="client" />
    </div>
    <div className="flex flex-col gap-2">
      <AuthLink href="/register/trainer" redirectUrlParam={searchParams.redirectUrl}>
        Zarejestruj się jako <span className="font-bold text-yellow-400">trener</span>
      </AuthLink>
      <AuthLink href="/login" redirectUrlParam={searchParams.redirectUrl}>
        Posiadasz już konto? <span className="font-bold text-yellow-400">Zaloguj się</span>
      </AuthLink>
    </div>
  </SplitPageWithImage>
);

export default RegisterClientPage;
