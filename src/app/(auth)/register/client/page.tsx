import { Metadata } from 'next';
import SplitPageWithImage from '@/app/(auth)/_components/split-page-with-image';
import AuthLink from '@/app/_components/auth-link';
import { SearchParams } from '@/utils/types';
import RegisterFormClient from './_components/register-form-client';

export const metadata: Metadata = {
  title: 'Rejestracja Klienta - FastyForm',
  description:
    'Dołącz do FastyForm jako klient. Zarejestruj się, aby mieć dostęp do zakupu personalizowanych analiz wideo od Twojego ulubionego trenera.',
};

const RegisterClientPage = ({ searchParams }: { searchParams: SearchParams }) => (
  <SplitPageWithImage imageProps={{ alt: 'Ekwipunek na siłowni', src: '/client-register.jpg' }}>
    <div className="flex flex-col gap-2.5 text-center">
      <span className="font-bold text-zinc-400">Witaj w FastyForm!</span>
      <h1 className="text-2xl text-white">
        Trenuj jak <span className="font-medium text-yellow-400">zawodowiec</span>,
        <br />z techniką <span className="font-medium text-yellow-400">mistrza</span>
      </h1>
    </div>
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white">Zarejestruj się jako klient</h2>
      <RegisterFormClient redirectUrlParam={searchParams.redirectUrl} />
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
