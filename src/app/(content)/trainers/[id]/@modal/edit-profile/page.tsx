import { Route } from 'next';
import { redirect } from 'next/navigation';
import { EditProfileValues } from '@/app/(content)/_components/edit-profile-form/_utils/edit-profile-form';
import EditProfileForm from '@/app/(content)/_components/edit-profile-form/edit-profile-form';
import checkIsTrainerProfileOwner from '@/app/(content)/trainers/[id]/_utils/check-is-trainer-profile-owner';
import getTrainerDetailsBySlug from '@/app/(content)/trainers/[id]/_utils/get-trainer-details-by-slug';
import AppModal from '@/components/app-modal';
import getUserWithNull from '@/utils/get-user-with-null';

const EditProfileModal = async ({ params }: { params: { id: string } }) => {
  const user = await getUserWithNull();
  const trainerDetails = await getTrainerDetailsBySlug(params.id);
  const isUserOwner = await checkIsTrainerProfileOwner(user, trainerDetails.user_id);

  if (!isUserOwner) redirect(`/trainers/${params.id}`);

  if (!trainerDetails.profile_name || !trainerDetails.service_price) throw new Error();

  const defaultFormData: EditProfileValues = {
    profileName: trainerDetails.profile_name,
    servicePrice: trainerDetails.service_price,
  };

  return (
    <AppModal redirectUrl={`/trainers/${params.id}` as Route}>
      <section className="min-h-screen-responsive flex w-screen max-w-2xl flex-col gap-5 border border-gray-600 bg-[#1e2226] px-5 py-10 min-[672px]:min-h-0 min-[672px]:rounded-xl min-[672px]:px-10">
        <h1 className="text-xl font-bold text-white">Edytuj swój profil</h1>
        <EditProfileForm
          defaultFormData={defaultFormData}
          profileImageUrl={trainerDetails.profile_image_url}
          trainerProfileSlug={params.id}
        />
      </section>
    </AppModal>
  );
};
export default EditProfileModal;
