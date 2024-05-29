'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButtonProps } from '@mui/lab';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  EditProfileValues,
  getEditProfileSchema,
} from '@/app/[locale]/(content)/trainers/[slug]/@modal/edit-profile/_utils/edit-profile';
import actionEditProfile from '@/app/[locale]/(content)/trainers/[slug]/@modal/edit-profile/action-edit-profile';
import AppButton from '@/components/app-button';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputPrice from '@/components/app-input/app-input-price';
import { formDefaultState } from '@/utils/form';
import notify from '@/utils/notify';
import FileUploadInput from './file-upload-input';

interface Props extends LoadingButtonProps {
  isValid: boolean;
  isLoading: boolean;
}

const SaveProfileButton = ({ isValid, isLoading, ...props }: Props) => {
  const { pending } = useFormStatus();

  return <AppButton loading={(pending && isValid) || isLoading} type="submit" {...props} />;
};

interface EditProfileFormProps {
  defaultFormData: EditProfileValues;
  profileImageUrl: string | null;
  trainerProfileSlug: string;
}

const EditProfileForm = ({ defaultFormData, profileImageUrl, trainerProfileSlug }: EditProfileFormProps) => {
  const t = useTranslations();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [state, formAction] = useFormState(actionEditProfile, formDefaultState);
  const { control, handleSubmit, formState } = useForm<EditProfileValues>({
    resolver: zodResolver(getEditProfileSchema(t)),
    defaultValues: defaultFormData,
    mode: 'onTouched',
  });

  const handleFormAction = (data: FormData) =>
    handleSubmit(async () => {
      if (imageBlob) {
        data.append('imageBlob', imageBlob);
      }

      formAction({ data, isDeleting, trainerProfileSlug });
    })();

  useEffect(() => {
    const handleAfterFormSubmit = async () => {
      if (state.isSuccess) {
        setIsRedirecting(true);
        router.push(`/trainers/${trainerProfileSlug}`);
        notify.success(t('COMMON_CHANGES_SAVED'));
      }
    };

    handleAfterFormSubmit();
  }, [router, state.isSuccess, trainerProfileSlug, t]);

  return (
    <form action={handleFormAction} className="flex grow flex-col gap-5">
      <div className="flex flex-col gap-5 text-sm">
        <AppFormState state={state} />
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
        <AppButton
          classes={{ contained: 'bg-inherit grow', root: 'py-2.5' }}
          className="text-sm text-white"
          onClick={() => router.push(`/trainers/${trainerProfileSlug}`)}
        >
          {t('COMMON_CANCEL')}
        </AppButton>
        <SaveProfileButton
          classes={{ root: 'grow' }}
          disabled={!(formState.isDirty || imageBlob || isDeleting)}
          isLoading={isRedirecting}
          isValid={formState.isValid}
        >
          {t('COMMON_SAVE')}
        </SaveProfileButton>
      </div>
    </form>
  );
};

export default EditProfileForm;
