import { Metadata } from 'next';
import Link from 'next/link';
import AuthFooter from '@/app/(auth)/_components/auth-footer';
import ErrorIcon from '@/assets/error-icon';
import ResendEmailForm from './_components/resend-email-form';

export const metadata: Metadata = {
  title: 'Błąd Weryfikacji E-mail - FastyForm',
  description:
    'Napotkałeś problem podczas weryfikacji e-mail? FastyForm pomoże Ci szybko rozwiązać problem. Sprawdź, co możesz zrobić',
};

const EmailVerificationErrorPage = () => (
  <div className="bg-custom-radial flex min-h-[inherit] flex-col items-center justify-center gap-10 px-10 py-5 text-center md:gap-16">
    <div className="my-auto flex w-full max-w-[400px] flex-col items-center justify-center gap-5">
      <ErrorIcon className="text-[60px]" height={100} width={100} />
      <h1 className="text-2xl font-bold text-white md:text-3xl">
        Link aktywacyjny jest
        <br /> niepoprawny lub wygasł
      </h1>
      <p className="text-white">
        Wyślij ponownie link aktywacyjny na <br />
        adres email podany podczas rejestracji.
      </p>
      <ResendEmailForm />
      <Link className="w-fit self-center text-white transition-opacity hover:opacity-80" href="/login">
        Przejdź na stronę logowania
      </Link>
    </div>
    <AuthFooter shouldNavigateBack />
  </div>
);

export default EmailVerificationErrorPage;
