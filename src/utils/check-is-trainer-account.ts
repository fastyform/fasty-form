import getUserFromSession from './get-user-from-session';

const checkIsTrainerAccount = async () => {
  const user = await getUserFromSession();

  return user.user_metadata.role === 'trainer';
};

export default checkIsTrainerAccount;
