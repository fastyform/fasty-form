import Image from 'next/image';
import LoginForm from './_components/register-form-client';

const RegisterClientPage = () => (
  <main className="grid min-h-screen px-5 pt-10 lg:grid-cols-2 lg:place-items-center lg:px-0 lg:pt-0">
    <div className="flex w-full max-w-sm grow flex-col gap-10 justify-self-center">
      <Image alt="FastForm logo" className="self-center object-contain" height={43} src="/logo.png" width={120} />
      <LoginForm />
    </div>
    <Image
      alt="Ekwipunek na siłowni"
      className="hidden h-full max-h-screen w-full object-cover lg:block"
      height={1024}
      src="/client-register.jpg"
      width={810}
    />
  </main>
);
export default RegisterClientPage;
