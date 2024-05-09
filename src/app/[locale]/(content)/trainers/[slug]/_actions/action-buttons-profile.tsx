import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import EditIcon from '@/app/[locale]/(content)/trainers/[slug]/_assets/edit-icon';
import ShareProfileButton from '@/app/[locale]/(content)/trainers/[slug]/_components/share-profile-button';
import checkIsTrainerProfileOwner from '@/app/[locale]/(content)/trainers/[slug]/_utils/check-is-trainer-profile-owner';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';

const ActionButtonsProfile = async ({ trainerId }: { trainerId: string }) => {
  const user = await getUserWithNull();
  const t = await getTranslations();
  const trainerDetails = await getTrainerDetailsById(trainerId);
  const isTrainerOwner = await checkIsTrainerProfileOwner(user, trainerId);

  if (!isTrainerOwner || !trainerDetails.profile_slug) return;

  return (
    <>
      <Link
        aria-label="Edycja profilu"
        className="flex h-11 w-11 min-w-0 items-center justify-center gap-2.5 rounded-xl border border-solid border-gray-600 bg-shark text-sm font-normal text-white lg:w-fit lg:px-5 lg:py-2.5 lg:transition-opacity lg:hover:opacity-80"
        href={`/trainers/${trainerDetails.profile_slug}/edit-profile`}
      >
        <EditIcon />
        <span className="hidden lg:block">{t('TRAINERS_PAGE_EDIT_PROFILE')}</span>
      </Link>
      <ShareProfileButton trainerDetails={trainerDetails} />
    </>
  );
};

export default ActionButtonsProfile;
