import { useTranslations } from 'next-intl';
import { SearchParams } from '@/utils/types';
import UpdatePasswordForm from './update-password-form';

const UpdatePassword = ({ searchParams }: { searchParams: SearchParams }) => {
  const t = useTranslations();

  return (
    <>
      <h1 className="text-2xl text-white">{t('SETTINGS_PASSWORD_TITLE')}</h1>
      <UpdatePasswordForm redirectPathParam={searchParams.redirectPath} />
    </>
  );
};

export default UpdatePassword;
