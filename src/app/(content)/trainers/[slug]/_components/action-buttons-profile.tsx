import Link from 'next/link';
import EditIcon from '@/app/(content)/trainers/[slug]/_assets/edit-icon';
import checkIsTrainerProfileOwner from '@/app/(content)/trainers/[slug]/_utils/check-is-trainer-profile-owner';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';
import ShareProfileButton from './share-profile-button';

const EditProfileButton = async ({ trainerProfileSlug }: { trainerProfileSlug: string }) => (
  <Link
    aria-label="Edycja profilu"
    className="flex h-11 w-11 min-w-0 items-center justify-center gap-2.5 rounded-xl border border-solid border-gray-600 bg-shark text-sm font-normal text-white lg:w-fit lg:px-5 lg:py-2.5 lg:transition-opacity lg:hover:opacity-80"
    href={`/trainers/${trainerProfileSlug}/edit-profile`}
  >
    <EditIcon />
    <span className="hidden lg:block">Edytuj profil</span>
  </Link>
);

const ActionButtonsProfile = async ({ trainerId }: { trainerId: string }) => {
  const user = await getUserWithNull();
  const trainerDetails = await getTrainerDetailsById(trainerId);
  const isTrainerOwner = await checkIsTrainerProfileOwner(user, trainerId);

  if (!isTrainerOwner || !trainerDetails.profile_slug) return;

  return (
    <>
      <EditProfileButton trainerProfileSlug={trainerDetails.profile_slug} />
      <ShareProfileButton trainerDetails={trainerDetails} />
    </>
  );
};

export default ActionButtonsProfile;
