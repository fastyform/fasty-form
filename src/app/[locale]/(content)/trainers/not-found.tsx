import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import AppButtonNew from '@/components/app-button-new';
import getUserWithNull from '@/utils/get-user-with-null';

const NotFoundTrainerError = async () => {
  const user = await getUserWithNull();
  const t = await getTranslations();
  const isLoggedIn = !!user;

  return (
    <div className="flex h-full w-full flex-col items-center gap-10 pt-5 text-center text-white">
      <PersonSearchRoundedIcon classes={{ root: 'text-9xl text-yellow-400' }} />
      <div className="flex flex-col gap-2">
        <h2 className="mb-2 text-4xl font-bold">{t('TRAINERS_NOT_FOUND_TITLE')}</h2>
        <p className="max-w-lg text-2xl">{t('TRAINERS_NOT_FOUND_DESCRIPTION_1')}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl">{t('TRAINERS_NOT_FOUND_DESCRIPTION_2')}</p>
        <span className="text-xl">{t('COMMON_OR')}</span>
        <AppButtonNew component={Link} href={isLoggedIn ? '/submissions' : '/login'} size="large">
          {isLoggedIn
            ? t('TRAINERS_NOT_FOUND_BUTTON_TEXT_LOGGED_IN')
            : t('TRAINERS_NOT_FOUND_BUTTON_TEXT_NOT_LOGGED_IN')}
        </AppButtonNew>
      </div>
    </div>
  );
};

export default NotFoundTrainerError;
