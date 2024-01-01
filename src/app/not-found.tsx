import Link from 'next/link';
import AppButton from '@/components/app-button';
import getUserWithNull from '@/utils/get-user-with-null';

const NotFoundPage = async () => {
  const user = await getUserWithNull();
  const isLoggedIn = !!user;

  return (
    <div className="bg-custom-radial min-h-screen-responsive flex  items-center justify-center p-5 text-white">
      <div className="flex flex-col gap-8">
        <h1 className="text-9xl font-bold md:text-[200px]">404</h1>
        <div className="flex flex-col gap-2">
          <h2 className="mb-2 text-5xl font-bold">Uuups!</h2>
          <p className="text-2xl">Strona, której szukasz nie została odnaleziona.</p>
        </div>
        <AppButton className="self-start" component={Link} href={isLoggedIn ? '/submissions' : '/login'}>
          {isLoggedIn ? 'Przejdź do swoich zgłoszeń' : 'Przejdź do strony logowania'}
        </AppButton>
      </div>
    </div>
  );
};

export default NotFoundPage;
