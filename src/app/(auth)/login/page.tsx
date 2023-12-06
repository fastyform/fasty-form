import Image from 'next/image';
import Link from 'next/link';
import AppLogo from '@/components/app-logo';
import LoginForm from './_components/login-form';

const LoginPage = () => (
  <main className="grid min-h-screen p-5 pt-10 lg:grid-cols-2 lg:place-items-center lg:p-0">
    <div className="flex w-full max-w-sm grow flex-col gap-10 justify-self-center">
      <AppLogo className="self-center" />
      <h1 className="text-2xl font-bold text-white">Zaloguj się</h1>
      <div className="flex flex-col gap-4">
        <LoginForm />
        <Link className="w-fit self-center text-white transition-opacity hover:opacity-80" href="/register/client">
          Nie masz konta? <span className="font-bold text-yellow-400">Zarejestruj się</span>
        </Link>
      </div>
    </div>
    <Image
      alt="Uśmiechnięci ludzie na siłowni."
      className="hidden h-full max-h-screen object-cover opacity-60 lg:block"
      height={0.75 * 1324}
      src="/login.jpg"
      width={0.75 * 1674}
    />
  </main>
);
export default LoginPage;
