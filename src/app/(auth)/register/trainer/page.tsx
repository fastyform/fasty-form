import Image from 'next/image';
import Link from 'next/link';
import AppLogo from '@/components/app-logo';
import RegisterFormTrainer from './_components/register-form-trainer';

const RegisterTrainerPage = () => (
  <main className="grid min-h-screen lg:grid-cols-2">
    <div className="grid place-items-center px-5">
      <div className="flex w-full max-w-sm grow flex-col gap-10 justify-self-center py-5 lg:py-10">
        <div className="flex flex-col items-center">
          <AppLogo className="mb-10" />
          <span className="mb-2.5 font-bold text-zinc-400">Witaj w FastForm!</span>
          <h1 className="text-center text-2xl text-white">
            Stań się trenerem <span className="font-medium text-yellow-400">przyszłości</span>,
            <br />
            dołącz, oceniaj, <span className="font-medium text-yellow-400">zarabiaj</span>
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <RegisterFormTrainer />
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
    </div>
    <Image
      alt="Ekwipunek na siłowni"
      className="fixed right-0 top-0 hidden h-full max-h-screen w-[50%] object-cover lg:block"
      height={1024}
      src="/client-register.jpg"
      width={810}
    />
  </main>
);

export default RegisterTrainerPage;
