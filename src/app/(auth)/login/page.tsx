import Image from 'next/image';
import AuthFooter from '@/app/(auth)/_components/auth-footer';
import AuthLink from '@/app/_components/auth-link';
import AppLogo from '@/components/app-logo';
import { SearchParams } from '@/utils/types';
import LoginForm from './_components/login-form';

const LoginPage = ({ searchParams }: { searchParams: SearchParams }) => (
  <main className="relative m-auto grid min-h-screen p-5 pt-10 lg:grid-cols-2 lg:place-items-center lg:p-0">
    <div className="relative flex h-full w-full max-w-sm grow flex-col justify-self-center lg:py-5">
      <div className="my-auto flex flex-col gap-10">
        <AppLogo className="self-center" />
        <h1 className="text-2xl font-bold text-white">Zaloguj się</h1>
        <div className="flex flex-col gap-4">
          <LoginForm redirectUrlParam={searchParams.redirectUrl} />
          <AuthLink href="/register/client" redirectUrlParam={searchParams.redirectUrl}>
            Nie masz konta? <span className="font-bold text-yellow-400">Zarejestruj się</span>
          </AuthLink>
        </div>
      </div>
      <AuthFooter shouldNavigateBack />
    </div>
    <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
      <Image fill alt="Uśmiechnięci ludzie na siłowni." className="object-cover opacity-60" src="/login.jpg" />
    </div>
  </main>
);

export default LoginPage;
