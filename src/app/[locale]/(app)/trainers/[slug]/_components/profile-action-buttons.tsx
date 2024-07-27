import checkIsTrainerProfileOwner from '@/app/[locale]/(app)/trainers/[slug]/_utils/check-is-trainer-profile-owner';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';
import EditProfile from './edit-profile';

const ProfileActionButtons = async ({ trainerId }: { trainerId: string }) => {
  const user = await getUserWithNull();
  const trainerDetails = await getTrainerDetailsById(trainerId);
  const isTrainerOwner = checkIsTrainerProfileOwner(user, trainerId);

  if (!isTrainerOwner || !trainerDetails.profile_slug) return;

  return <EditProfile trainerDetails={trainerDetails} />;
};

export default ProfileActionButtons;
