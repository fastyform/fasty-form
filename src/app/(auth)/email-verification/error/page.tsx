import Link from 'next/link';
import ErrorIcon from '@/assets/error-icon';
import ResendEmailForm from './_components/resend-email-form';

const EmailVerificationErrorPage = () => (
  <div className="bg-custom-radial flex min-h-[inherit] flex-col items-center justify-center gap-10 px-10 text-center md:gap-16">
    <div className="flex w-full max-w-[400px] flex-col items-center justify-center gap-5">
      <ErrorIcon className="text-[60px]" height={100} width={100} />
      <h1 className="text-2xl font-bold text-white md:text-3xl">
        Link aktywacyjny jest
        <br /> niepoprawny lub wygasł
      </h1>
      <p className="text-white">
        Wyślij ponownie link aktywacyjny na <br />
        adres email, który podałeś podczas rejestracji.
      </p>
      <ResendEmailForm />
      <Link className="w-fit self-center text-white transition-opacity hover:opacity-80" href="/login">
        Przejdź na stronę logowania
      </Link>
    </div>
  </div>
);

export default EmailVerificationErrorPage;
