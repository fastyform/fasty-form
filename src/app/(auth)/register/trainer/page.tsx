import Image from 'next/image';
import AuthFooter from '@/app/(auth)/_components/auth-footer';
import AuthLink from '@/app/_components/auth-link';
import AppLogo from '@/components/app-logo';
import { SearchParams } from '@/utils/types';
import RegisterFormTrainer from './_components/register-form-trainer';

const RegisterTrainerPage = ({ searchParams }: { searchParams: SearchParams }) => (
  <main className="relative m-auto grid min-h-screen max-w-sm p-5 pt-10 lg:max-w-none lg:grid-cols-2 lg:place-items-center lg:p-0">
    <div className="relative flex h-full w-full max-w-sm grow flex-col justify-center lg:py-5">
      <div className="my-auto flex flex-col gap-10">
        <AppLogo className="self-center" />
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
      </div>
      <AuthFooter shouldNavigateBack />
    </div>
    <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
      <Image fill alt="Ekwipunek na siłowni" className="object-cover" src="/trainer-register.jpg" />
    </div>
  </main>
);

export default RegisterTrainerPage;
