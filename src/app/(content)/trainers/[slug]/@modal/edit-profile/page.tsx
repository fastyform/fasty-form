import { redirect } from 'next/navigation';
import { EditProfileValues } from '@/app/(content)/_components/edit-profile-form/_utils/edit-profile-form';
import EditProfileForm from '@/app/(content)/_components/edit-profile-form/edit-profile-form';
import checkIsTrainerProfileOwner from '@/app/(content)/trainers/[slug]/_utils/check-is-trainer-profile-owner';
import getTrainerIdBySlug from '@/app/(content)/trainers/[slug]/_utils/get-trainer-id-by-slug';
import { groszToPLN } from '@/app/(stripe)/stripe/_utils';
import AppModal from '@/components/app-modal';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';

const EditProfileModal = async ({ params }: { params: { slug: string } }) => {
  const user = await getUserWithNull();
  const trainerId = (await getTrainerIdBySlug(params.slug)).user_id;
  const trainerDetails = await getTrainerDetailsById(trainerId);
  const isUserOwner = await checkIsTrainerProfileOwner(user, trainerId);

  if (!isUserOwner) redirect(`/trainers/${params.slug}`);

  if (!trainerDetails.profile_name || !trainerDetails.service_price_in_grosz) throw new Error();

  const defaultFormData: EditProfileValues = {
    profileName: trainerDetails.profile_name,
    servicePrice: groszToPLN(trainerDetails.service_price_in_grosz),
  };

  return (
    <AppModal redirectUrl={`/trainers/${params.slug}`}>
      <section className="min-h-screen-responsive flex w-screen max-w-2xl flex-col gap-5 border border-gray-600 bg-shark px-5 py-10 min-[672px]:min-h-0 min-[672px]:rounded-xl min-[672px]:px-10">
        <h1 className="text-xl font-bold text-white">Edytuj swój profil</h1>
        <EditProfileForm
          defaultFormData={defaultFormData}
          profileImageUrl={trainerDetails.profile_image_url}
          trainerProfileSlug={params.slug}
        />
      </section>
    </AppModal>
  );
};
export default EditProfileModal;
