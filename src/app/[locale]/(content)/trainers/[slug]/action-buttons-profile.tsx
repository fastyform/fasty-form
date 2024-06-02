import ShareProfileButton from '@/app/[locale]/(content)/trainers/[slug]/_components/share-profile-button';
import checkIsTrainerProfileOwner from '@/app/[locale]/(content)/trainers/[slug]/_utils/check-is-trainer-profile-owner';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';
import EditProfile from './_components/edit-profile/edit-profile';

const ActionButtonsProfile = async ({ trainerId }: { trainerId: string }) => {
  const user = await getUserWithNull();
  const trainerDetails = await getTrainerDetailsById(trainerId);
  const isTrainerOwner = checkIsTrainerProfileOwner(user, trainerId);

  if (!isTrainerOwner || !trainerDetails.profile_slug) return;

  return (
    <>
      <EditProfile trainerDetails={trainerDetails} />
      <ShareProfileButton isIconOnMobile trainerDetails={trainerDetails} />
    </>
  );
};

export default ActionButtonsProfile;
