'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButtonProps } from '@mui/lab';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import {
  editProfileSchema,
  EditProfileValues,
} from '@/app/(content)/_components/edit-profile-form/_utils/edit-profile-form';
import AppButton from '@/components/app-button';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputPrice from '@/components/app-input/app-input-price';
import { formDefaultState } from '@/utils/form';
import notify from '@/utils/notify';
import actionEditProfile from './_actions/action-edit-profile';
import FileUploadInput from './_components/file-upload-input/file-upload-input';
import revalidatePathsAfterProfileEdit from './_utils/revalidate-paths-after-profile-edit';

interface Props extends LoadingButtonProps {
  isValid: boolean;
  isLoading: boolean;
}

const SaveProfileButton = ({ isValid, isLoading, ...props }: Props) => {
  const { pending } = useFormStatus();

  return <AppButton loading={(pending && isValid) || isLoading} type="submit" {...props} />;
};

const EditProfileForm = ({
  defaultFormData,
  profileImageUrl,
  trainerProfileSlug,
}: {
  defaultFormData: EditProfileValues;
  profileImageUrl: string | null;
  trainerProfileSlug: string;
}) => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [state, formAction] = useFormState(actionEditProfile, formDefaultState);
  const { control, handleSubmit, formState } = useForm<EditProfileValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: defaultFormData,
    mode: 'onTouched',
  });

  const handleFormAction = (data: FormData) =>
    handleSubmit(async () => {
      if (imageBlob) {
        data.append('imageBlob', imageBlob);
      }

      formAction({ data, isDeleting });
    })();

  useEffect(() => {
    const handleAfterFormSubmit = async () => {
      if (state.isSuccess) {
        setIsRedirecting(true);
        await revalidatePathsAfterProfileEdit(trainerProfileSlug);
        router.push(`/trainers/${trainerProfileSlug}` as Route);
        notify.success('Zapisano zmiany');
      }
    };

    handleAfterFormSubmit();
  }, [router, state.isSuccess, trainerProfileSlug]);

  return (
    <form action={handleFormAction} className="flex grow flex-col gap-5">
      <div className="flex flex-col gap-5 text-sm">
        <AppFormState state={state} />
        <div className="flex flex-col gap-2.5 ">
          <span className="text-white">
            Cena za analizę techniki jednego wideo <span className="text-yellow-400">(PLN)</span>
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
          <span className="text-white">Nazwa profilu</span>
          <AppInputForm control={control} fieldName="profileName" />
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <span className="mr-auto text-white">Zdjęcie profilowe</span>
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
          classes={{ root: 'py-2.5 bg-inherit grow' }}
          className="text-sm text-white"
          onClick={() => router.push(`/trainers/${trainerProfileSlug}` as Route)}
        >
          Anuluj
        </AppButton>
        <SaveProfileButton
          classes={{ root: 'grow' }}
          disabled={!(formState.isDirty || imageBlob || isDeleting)}
          isLoading={isRedirecting}
          isValid={formState.isValid}
        >
          Zapisz
        </SaveProfileButton>
      </div>
    </form>
  );
};

export default EditProfileForm;
