import Image from 'next/image';
import AuthLink from '@/app/_components/auth-link';
import AppLogo from '@/components/app-logo';
import { SearchParams } from '@/utils/types';
import RegisterFormClient from './_components/register-form-client';

const RegisterClientPage = ({ searchParams }: { searchParams: SearchParams }) => (
  <main className="grid min-h-screen lg:grid-cols-2">
    <div className="grid place-items-center p-5">
      <div className="flex w-full max-w-sm grow flex-col gap-5 justify-self-center">
        <div className="flex flex-col gap-10">
          <AppLogo className="self-center" />
          <div className="flex flex-col gap-2.5 text-center">
            <span className="font-bold text-zinc-400">Witaj w FastForm!</span>
            <h1 className="text-2xl text-white">
              Trenuj jak <span className="font-medium text-yellow-400">zawodowiec</span>,
              <br />z techniką <span className="font-medium text-yellow-400">mistrza</span>
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white">Zarejestruj się jako klient</h2>
            <RegisterFormClient redirectUrlParam={searchParams.redirectUrl} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <AuthLink href="/register/trainer" redirectUrlParam={searchParams.redirectUrl}>
            Zarejestruj się jako <span className="font-bold text-yellow-400">trener</span>
          </AuthLink>
          <AuthLink href="/login" redirectUrlParam={searchParams.redirectUrl}>
            Posiadasz już konto? <span className="font-bold text-yellow-400">Zaloguj się</span>
          </AuthLink>
        </div>
      </div>
    </div>
    <Image
      alt="Ekwipunek na siłowni"
      className="hidden h-full max-h-screen w-full object-cover lg:block"
      height={1024}
      src="/client-register.jpg"
      width={810}
    />
  </main>
);

export default RegisterClientPage;
