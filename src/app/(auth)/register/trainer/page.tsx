import Image from 'next/image';
import Link from 'next/link';
import AppLogo from '@/components/app-logo';
import RegisterFormTrainer from './_components/register-form-trainer';

const RegisterTrainerPage = () => (
  <main className="grid min-h-screen lg:grid-cols-2">
    <div className="grid place-items-center p-5">
      <div className="flex w-full max-w-sm grow flex-col gap-5 justify-self-center">
        <div className="flex flex-col gap-10">
          <AppLogo />
          <div className="flex flex-col gap-2.5 text-center">
            <span className="font-bold text-zinc-400">Witaj w FastForm!</span>
            <h1 className="text-2xl text-white">
              Stań się trenerem <span className="font-medium text-yellow-400">przyszłości</span>,
              <br />
              dołącz, trenuj, <span className="font-medium text-yellow-400">zarabiaj</span>
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white">Zarejestruj się jako trener</h2>
            <RegisterFormTrainer />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link className="w-fit self-center text-white transition-opacity hover:opacity-80" href="/register/client">
            Zarejestruj się jako <span className="font-bold text-yellow-400">klient</span>
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
      height={1986}
      src="/trainer-register.jpg"
      width={1324}
    />
  </main>
);

export default RegisterTrainerPage;
