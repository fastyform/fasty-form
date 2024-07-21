'use client';

import { useState } from 'react';
import { IconButton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { twJoin } from 'tailwind-merge';
import EditIcon from '@/app/[locale]/(app)/trainers/[slug]/_assets/edit-icon';
import AppButton from '@/components/app-button';
import AppModal from '@/components/app-modal';
import { TrainerDetails } from '@/utils/get-trainer-details-by-id';
import { groszToPLN } from '@/utils/stripe';
import { EditBioForm, EditPriceForm, EditProfileNameForm, EditSocialLinksForm } from './edit-profile-form-components';
import EditUserProfilePictureForm from './edit-user-profile-picture-form';

const FormDivider = () => <div className="border-b border-gray-600" />;

const EditProfile = ({ trainerDetails }: { trainerDetails: TrainerDetails }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const t = useTranslations();

  if (!trainerDetails.profile_name || !trainerDetails.service_price_in_grosz || !trainerDetails.profile_slug)
    throw new Error();

  const handleModalOpen = () => setIsEditingProfile(true);
  const handleModalClose = () => setIsEditingProfile(false);

  return (
    <>
      <AppButton className={twJoin('hidden gap-2 lg:flex')} color="secondary" onClick={handleModalOpen}>
        <EditIcon />
        <span>{t('TRAINERS_PAGE_EDIT_PROFILE')}</span>
      </AppButton>
      <IconButton
        className="size-[50px] border border-solid border-gray-600 bg-shark lg:hidden"
        onClick={handleModalOpen}
      >
        <EditIcon />
      </IconButton>
      <AppModal
        DialogProps={{ classes: { paper: 'bg-bunker' } }}
        open={isEditingProfile}
        SwipeableDrawerProps={{ classes: { paper: 'bg-bunker' }, swipeHandlerClassName: 'bg-bunker' }}
        onClose={handleModalClose}
      >
        <div className="flex flex-col gap-10">
          <h2 className="text-xl font-bold text-white">{t('TRAINERS_EDIT_PROFILE_TITLE')}</h2>
          <div className="flex flex-col gap-5 text-sm">
            <EditPriceForm
              servicePrice={groszToPLN(trainerDetails.service_price_in_grosz)}
              trainerProfileSlug={trainerDetails.profile_slug}
            />
            <FormDivider />
            <EditProfileNameForm
              profileName={trainerDetails.profile_name}
              trainerProfileSlug={trainerDetails.profile_slug}
            />
            <FormDivider />
            <EditBioForm bio={trainerDetails.bio} trainerProfileSlug={trainerDetails.profile_slug} />
            <FormDivider />
            <EditUserProfilePictureForm
              profileImageUrl={trainerDetails.profile_image_url}
              trainerProfileSlug={trainerDetails.profile_slug}
            />
            <FormDivider />
            <EditSocialLinksForm
              socialLinks={trainerDetails.social_links}
              trainerProfileSlug={trainerDetails.profile_slug}
            />
          </div>
          <AppButton variant="outlined" onClick={handleModalClose}>
            {t('COMMON_CLOSE')}
          </AppButton>
        </div>
      </AppModal>
    </>
  );
};
export default EditProfile;
