import Image from 'next/image';
import Link from 'next/link';
import AppLogo from '@/components/app-logo';
import RegisterFormClient from './_components/register-form-client';

const RegisterClientPage = () => (
  <main className="grid min-h-screen lg:grid-cols-2">
    <div className="grid place-items-center p-5">
      <div className="flex w-full max-w-sm grow flex-col gap-5 justify-self-center">
        <div className="flex flex-col gap-10">
          <AppLogo />
          <div className="flex flex-col gap-2.5 text-center">
            <span className="font-bold text-zinc-400">Witaj w FastForm!</span>
            <h1 className="text-2xl text-white">
              Trenuj jak <span className="font-medium text-yellow-400">zawodowiec</span>,
              <br />z techniką <span className="font-medium text-yellow-400">mistrza</span>
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white">Zarejestruj się jako klient</h2>
            <RegisterFormClient />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link className="w-fit self-center text-white transition-opacity hover:opacity-80" href="/register/trainer">
            Zarejestruj się jako <span className="font-bold text-yellow-400">trener</span>
          </Link>
          <Link className="w-fit self-center text-white transition-opacity hover:opacity-80" href="/login">
            Posiadasz już konto? <span className="font-bold text-yellow-400">Zaloguj się</span>
          </Link>
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
