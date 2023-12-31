import Link from 'next/link';
import EditIcon from '@/app/(content)/trainers/[id]/_assets/edit-icon';
import checkIsTrainerProfileOwner from '@/app/(content)/trainers/[id]/_utils/check-is-trainer-profile-owner';
import getTrainerDetailsBySlug from '@/app/(content)/trainers/[id]/_utils/get-trainer-details-by-slug';
import getUserWithNull from '@/utils/get-user-with-null';
import ShareProfileButton from './share-profile-button';

const EditProfileButton = async ({ trainerProfileSlug }: { trainerProfileSlug: string }) => (
  <Link
    aria-label="Edycja profilu"
    className="flex h-11 w-11 min-w-0 items-center justify-center gap-2.5 rounded-xl border border-solid border-gray-600 bg-[#1E2226] text-sm font-normal text-white lg:w-fit lg:px-5 lg:py-2.5 lg:transition-opacity lg:hover:opacity-80"
    href={`/trainers/${trainerProfileSlug}/edit-profile`}
  >
    <EditIcon />
    <span className="hidden lg:block">Edytuj profil</span>
  </Link>
);

const ActionButtonsProfile = async ({ trainerProfileSlug }: { trainerProfileSlug: string }) => {
  const user = await getUserWithNull();
  const trainerDetails = await getTrainerDetailsBySlug(trainerProfileSlug);
  const isTrainerOwner = await checkIsTrainerProfileOwner(user, trainerDetails.user_id);

  if (!isTrainerOwner || !trainerDetails.profile_name) return;

  return (
    <>
      <EditProfileButton trainerProfileSlug={trainerProfileSlug} />
      {trainerDetails.is_onboarded && trainerDetails.is_onboarded_stripe && (
        <ShareProfileButton profileName={trainerDetails.profile_name} />
      )}
    </>
  );
};

export default ActionButtonsProfile;
