'use client';

import { useState } from 'react';
import { IconButton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { twJoin } from 'tailwind-merge';
import EditIcon from '@/app/[locale]/(content)/trainers/[slug]/_assets/edit-icon';
import AppButtonNew from '@/components/app-button-new';
import AppModal from '@/components/app-modal';
import { TrainerDetails } from '@/utils/get-trainer-details-by-id';
import { groszToPLN } from '@/utils/stripe';
import EditProfileForm from './_components/edit-profile-form';
import { EditProfileValues } from './_utils/edit-profile';

const EditProfile = ({ trainerDetails }: { trainerDetails: TrainerDetails }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const t = useTranslations();

  if (!trainerDetails.profile_name || !trainerDetails.service_price_in_grosz || !trainerDetails.profile_slug)
    throw new Error();

  const defaultFormData: EditProfileValues = {
    profileName: trainerDetails.profile_name,
    servicePrice: groszToPLN(trainerDetails.service_price_in_grosz),
  };

  const handleModalOpen = () => setIsEditingProfile(true);
  const handleModalClose = () => setIsEditingProfile(false);

  return (
    <>
      <AppButtonNew className={twJoin('hidden gap-2 lg:flex')} color="secondary" onClick={handleModalOpen}>
        <EditIcon />
        <span>{t('TRAINERS_PAGE_EDIT_PROFILE')}</span>
      </AppButtonNew>
      <IconButton
        className="size-[50px] border border-solid border-gray-600 bg-shark lg:hidden"
        onClick={handleModalOpen}
      >
        <EditIcon />
      </IconButton>
      <AppModal open={isEditingProfile} onClose={handleModalClose}>
        <h2 className="text-xl font-bold text-white">{t('TRAINERS_EDIT_PROFILE_TITLE')}</h2>
        <EditProfileForm
          defaultFormData={defaultFormData}
          handleModalClose={handleModalClose}
          profileImageUrl={trainerDetails.profile_image_url}
          trainerProfileSlug={trainerDetails.profile_slug}
        />
      </AppModal>
    </>
  );
};
export default EditProfile;
