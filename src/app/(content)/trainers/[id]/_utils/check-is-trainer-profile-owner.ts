import getUserFromSession from '@/utils/get-user-from-session';

const checkIsTrainerProfileOwner = async (trainerId: string) => {
  const user = await getUserFromSession();

  return trainerId === user.id;
};

export default checkIsTrainerProfileOwner;
