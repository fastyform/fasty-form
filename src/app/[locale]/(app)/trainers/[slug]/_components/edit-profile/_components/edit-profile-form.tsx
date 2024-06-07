'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import {
  EditProfileValues,
  getEditProfileSchema,
} from '@/app/[locale]/(app)/trainers/[slug]/_components/edit-profile/_utils/edit-profile';
import actionEditProfile from '@/app/[locale]/(app)/trainers/[slug]/_components/edit-profile/action-edit-profile';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputPrice from '@/components/app-input/app-input-price';
import notify from '@/utils/notify';
import FileUploadInput from './file-upload-input';

interface EditProfileFormProps {
  defaultFormData: EditProfileValues;
  profileImageUrl: string | null;
  trainerProfileSlug: string;
  handleModalClose: () => void;
}

const EditProfileForm = ({
  defaultFormData,
  profileImageUrl,
  trainerProfileSlug,
  handleModalClose,
}: EditProfileFormProps) => {
  const t = useTranslations();
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const { control, handleSubmit, formState } = useForm<EditProfileValues>({
    resolver: zodResolver(getEditProfileSchema(t)),
    defaultValues: defaultFormData,
    mode: 'onTouched',
  });

  const editProfileMutation = useMutation({
    mutationFn: actionEditProfile,
    onSuccess: () => {
      handleModalClose();
      notify.success(t('COMMON_CHANGES_SAVED'));
    },
    onError: () => notify.error(t('TRAINERS_EDIT_PROFILE_ERROR_SAVE')),
  });

  const onSubmit = (data: EditProfileValues) => {
    let imageBlobFormData = null;
    if (imageBlob) {
      imageBlobFormData = new FormData();
      imageBlobFormData.set('image', imageBlob);
    }
    editProfileMutation.mutate({ data: { ...data, imageBlob: imageBlobFormData }, isDeleting, trainerProfileSlug });
  };

  return (
    <form className="flex grow flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5 text-sm">
        <div className="flex flex-col gap-2.5 ">
          <span className="text-white">
            {t('TRAINERS_EDIT_PROFILE_PRICE_LABEL')} <span className="text-yellow-400">({t('CURRENCY_PLN')})</span>
          </span>
          <Controller
            control={control}
            name="servicePrice"
            render={({ field }) => (
              <AppInputPrice name="servicePrice" value={field.value} onChange={(_, value) => field.onChange(value)} />
            )}
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="text-white">{t('COMMON_PROFILE_NAME')}</span>
          <AppInputForm control={control} fieldName="profileName" />
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <span className="mr-auto text-white">{t('TRAINERS_EDIT_PROFILE_IMAGE_LABEL')}</span>
          <FileUploadInput
            imageBlob={imageBlob}
            isDeleting={isDeleting}
            profileImageUrl={profileImageUrl}
            setImageBlob={setImageBlob}
            setIsDeleting={setIsDeleting}
          />
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-5">
        <AppButton className="grow" color="secondary" size="large" variant="text" onClick={handleModalClose}>
          {t('COMMON_CANCEL')}
        </AppButton>
        <AppButton
          className="grow"
          disabled={!(formState.isDirty || imageBlob || isDeleting)}
          loading={editProfileMutation.isPending}
          size="large"
          type="submit"
        >
          {t('COMMON_SAVE')}
        </AppButton>
      </div>
    </form>
  );
};

export default EditProfileForm;
