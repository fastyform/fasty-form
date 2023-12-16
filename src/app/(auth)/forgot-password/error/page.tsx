import { Metadata } from 'next';
import Link from 'next/link';
import AuthFooter from '@/app/(auth)/_components/auth-footer';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';
import Constants from '@/utils/constants';

export const metadata: Metadata = {
  title: `Błąd Resetowania Hasła - ${Constants.APP_NAME}`,
  description: `Wystąpił problem z resetowaniem hasła w ${Constants.APP_NAME}. Skorzystaj z naszej pomocy, aby szybko wrócić do swojego konta`,
};

const ForgotPasswordErrorPage = () => (
  <div className="bg-custom-radial flex min-h-[inherit] flex-col items-center justify-center gap-10 px-10 py-5 text-center md:gap-16">
    <div className="my-auto flex w-full max-w-[400px] flex-col items-center justify-center gap-5">
      <ErrorIcon className="text-[60px]" height={100} width={100} />
      <h1 className="text-2xl font-bold text-white md:text-3xl">Link jest niepoprawny lub wygasł</h1>
      <AppButton href="/forgot-password" LinkComponent={Link}>
        Przejdź na stronę resetowania hasła
      </AppButton>
    </div>
    <AuthFooter />
  </div>
);

export default ForgotPasswordErrorPage;
