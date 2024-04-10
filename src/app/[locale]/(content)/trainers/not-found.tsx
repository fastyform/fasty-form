import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import Link from 'next/link';
import AppButton from '@/components/app-button';
import getUserWithNull from '@/utils/get-user-with-null';

const NotFoundTrainerError = async () => {
  const user = await getUserWithNull();
  const isLoggedIn = !!user;

  return (
    <div className="flex h-full w-full flex-col items-center gap-10 pt-5 text-center text-white">
      <PersonSearchRoundedIcon classes={{ root: 'text-9xl text-yellow-400' }} />
      <div className="flex flex-col gap-2">
        <h2 className="mb-2 text-4xl font-bold">Nie znaleziono profilu trenera</h2>
        <p className="max-w-lg text-2xl">
          Wygląda na to, że adres URL profilu trenera jest nieprawidłowy, lub konto nie istnieje.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl">Spróbuj sprawdzić link jeszcze raz</p>
        <span className="text-xl">lub</span>
        <AppButton className="self-center" component={Link} href={isLoggedIn ? '/submissions' : '/login'}>
          {isLoggedIn ? 'Zobacz swoje zgłoszenia' : 'Przejdź do strony logowania'}
        </AppButton>
      </div>
    </div>
  );
};

export default NotFoundTrainerError;
