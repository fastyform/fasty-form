import getLoggedInUser from '@/utils/get-logged-in-user';
import DeleteAccountButton from './delete-account-button';

const AccountManagePage = async () => {
  const user = await getLoggedInUser();

  return (
    <>
      <h1 className="text-2xl text-white">Konto</h1>
      <DeleteAccountButton userId={user.id} />
    </>
  );
};

export default AccountManagePage;
