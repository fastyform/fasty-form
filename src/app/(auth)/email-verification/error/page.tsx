import ErrorIcon from '@/assets/error-icon';
import ResendEmailForm from './_components/resend-email-form';

const EmailVerificationErrorPage = () => (
  <div className="flex min-h-[inherit] flex-col items-center justify-center gap-10 px-10 text-center md:gap-16">
    <div className="flex flex-col items-center justify-center gap-5">
      <ErrorIcon className="text-[60px]" height={100} width={100} />
      <h1 className="text-2xl font-bold text-white md:text-3xl">
        Wystąpił błąd podczas
        <br /> weryfikacji Twojego adresu email
      </h1>
      <p className="text-white">Wyślij ponownie link aktywacyjny lub skontaktuj się z nami.</p>
      <ResendEmailForm />
    </div>
  </div>
);

export default EmailVerificationErrorPage;
