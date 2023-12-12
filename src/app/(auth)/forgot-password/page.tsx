import Image from 'next/image';
import AuthFooter from '@/app/(auth)/_components/auth-footer';
import AuthLink from '@/app/_components/auth-link';
import AppLogo from '@/components/app-logo';
import { SearchParams } from '@/utils/types';
import ForgotPasswordForm from './_components/forgot-password-form';

const ForgotPasswordPage = ({ searchParams }: { searchParams: SearchParams }) => (
  <main className="relative m-auto grid min-h-screen max-w-sm p-5 pt-10 lg:max-w-none lg:grid-cols-2 lg:place-items-center lg:p-0">
    <div className="relative flex h-full w-full max-w-sm grow flex-col justify-center lg:py-5">
      <div className="my-auto flex flex-col gap-10">
        <AppLogo className="self-center" />
        <h1 className="text-2xl font-bold text-white">Zapomniałeś hasła?</h1>

        <ForgotPasswordForm redirectUrlParam={searchParams.redirectUrl} />
        <AuthLink href="/login" redirectUrlParam={searchParams.redirectUrl}>
          Pamiętasz hasło? <span className="font-bold text-yellow-400">Zaloguj się</span>
        </AuthLink>
      </div>
      <AuthFooter shouldNavigateBack />
    </div>
    <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
      <Image fill alt="Hantle na siłowni" className="object-cover" src="/forgot-password.png" />
    </div>
  </main>
);

export default ForgotPasswordPage;
