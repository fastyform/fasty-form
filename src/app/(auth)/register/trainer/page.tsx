import SplitPageWithImage from '@/app/(auth)/_components/split-page-with-image';
import AuthLink from '@/app/_components/auth-link';
import { SearchParams } from '@/utils/types';
import RegisterFormTrainer from './_components/register-form-trainer';

const RegisterTrainerPage = ({ searchParams }: { searchParams: SearchParams }) => (
  <SplitPageWithImage imageProps={{ alt: 'Ekwipunek na siłowni', src: '/trainer-register.jpg' }}>
    <div className="flex flex-col gap-2.5 text-center">
      <span className="font-bold text-zinc-400">Witaj w FastyForm!</span>
      <h1 className="text-2xl text-white">
        Stań się trenerem <span className="font-medium text-yellow-400">przyszłości</span>,
        <br />
        dołącz, trenuj, <span className="font-medium text-yellow-400">zarabiaj</span>
      </h1>
    </div>
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white">Zarejestruj się jako trener</h2>
      <RegisterFormTrainer redirectUrlParam={searchParams.redirectUrl} />
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

export default RegisterTrainerPage;
