import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Locale } from '@/utils/constants';
import getLoggedInUser from '@/utils/get-logged-in-user';
import DeleteAccountButton from './delete-account-button';

const AccountManagePage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

  const user = await getLoggedInUser();
  const t = await getTranslations();

  return (
    <>
      <h1 className="text-2xl text-white">{t('SETTINGS_ACCOUNT_TITLE')}</h1>
      <DeleteAccountButton userId={user.id} />
    </>
  );
};

export default AccountManagePage;
