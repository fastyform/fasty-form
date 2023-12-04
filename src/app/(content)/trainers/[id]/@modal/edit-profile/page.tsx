import { Route } from 'next';
import { redirect } from 'next/navigation';
import EditProfileForm from '@/app/(content)/_components/edit-profile-form/edit-profile-form';
import { TrainerDetailsValues } from '@/app/(content)/_utils/trainer-details-form';
import checkIsTrainerProfileOwner from '@/app/(content)/trainers/[id]/_utils/check-is-trainer-profile-owner';
import getTrainerDetailsById from '@/app/(content)/trainers/[id]/_utils/get-trainer-details-by-id';
import AppModal from '@/components/app-modal';
import getUserWithNull from '@/utils/get-user-with-null';

const EditProfileModal = async ({ params }: { params: { id: string } }) => {
  const user = await getUserWithNull();
  const isUserOwner = await checkIsTrainerProfileOwner(user, params.id);

  if (!isUserOwner) redirect(`/trainers/${params.id}`);

  const trainerDetails = await getTrainerDetailsById(params.id);
  if (!trainerDetails.profile_name || !trainerDetails.service_price) throw new Error();

  const defaultFormData: TrainerDetailsValues = {
    profileName: trainerDetails.profile_name,
    servicePrice: trainerDetails.service_price,
  };

  return (
    <AppModal redirectUrl={`/trainers/${params.id}` as Route}>
      <section className="flex min-h-screen w-screen max-w-2xl flex-col gap-5 border border-gray-600 bg-[#1e2226] px-5 py-10 min-[672px]:min-h-0 min-[672px]:rounded-xl min-[672px]:px-10 ">
        <h1 className="text-xl font-bold text-white">Edytuj swój profil</h1>
        <EditProfileForm
          defaultFormData={defaultFormData}
          profileImageUrl={trainerDetails.profile_image_url}
          trainerId={params.id}
        />
      </section>
    </AppModal>
  );
};
export default EditProfileModal;
