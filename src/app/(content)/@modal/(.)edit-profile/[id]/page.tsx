import { EditProfileFormValues } from '@/app/(content)/_components/edit-profile-form/_utils';
import EditProfileForm from '@/app/(content)/_components/edit-profile-form/edit-profile-form';
import getTrainerDetailsById from '@/app/(content)/trainers/[id]/_utils/get-trainer-details-by-id';
import AppModal from '@/components/app-modal';

const EditProfileModal = async ({ params }: { params: { id: string } }) => {
  const trainerDetails = await getTrainerDetailsById(params.id);
  const defaultFormData: EditProfileFormValues = {
    profileName: trainerDetails.profile_name,
    servicePrice: trainerDetails.service_price,
  };

  return (
    <AppModal>
      <section className="flex h-screen w-screen max-w-2xl  flex-col gap-5  border border-gray-600 bg-[#1e2226] px-5 py-10 min-[672px]:h-fit min-[672px]:rounded-xl min-[672px]:px-10 ">
        <h1 className="text-xl font-bold text-white">Edytuj swój profil</h1>
        <EditProfileForm defaultFormData={defaultFormData} profileImageUrl={trainerDetails.profile_image_url} />
      </section>
    </AppModal>
  );
};
export default EditProfileModal;
