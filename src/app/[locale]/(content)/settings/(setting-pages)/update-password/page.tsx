import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Locale } from '@/utils/constants';
import { SearchParams } from '@/utils/types';
import UpdatePasswordForm from './update-password-form';

const UpdatePassword = ({
  searchParams,
  params: { locale },
}: {
  searchParams: SearchParams;
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <>
      <h1 className="text-2xl text-white">{t('SETTINGS_PASSWORD_TITLE')}</h1>
      <UpdatePasswordForm redirectPathParam={searchParams.redirectPath} />
    </>
  );
};

export default UpdatePassword;
