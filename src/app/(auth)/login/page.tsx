import Image from 'next/image';
import AppLogo from '@/components/app-logo';
import LoginForm from './_components/login-form';

// TODO: Export img from figma with
const LoginPage = () => (
  <main className="grid min-h-screen px-5 pt-10 lg:grid-cols-2 lg:place-items-center lg:px-0 lg:pt-0">
    <div className="flex w-full max-w-sm grow flex-col gap-10 justify-self-center">
      <AppLogo />
      <h1 className="text-2xl font-bold text-white">Zaloguj się</h1>
      <LoginForm />
    </div>
    <Image
      alt="Uśmiechnięci ludzie na siłowni max-w-full"
      className="hidden h-full max-h-screen object-cover opacity-60 lg:block"
      height={0.75 * 1324}
      src="/login.jpg"
      width={0.75 * 1674}
    />
  </main>
);
export default LoginPage;
