import { getTranslations } from 'next-intl/server';
import getLoggedInUser from '@/utils/get-logged-in-user';
import DeleteAccountButton from './delete-account-button';

const AccountManagePage = async () => {
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
