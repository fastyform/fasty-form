'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { trainerDetailsSchema, TrainerDetailsValues } from '@/app/(content)/_utils/trainer-details-form';
import AppButton from '@/components/app-button';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputPrice from '@/components/app-input/app-input-price';
import { formDefaultState } from '@/utils/form';
import notify from '@/utils/notify';
import actionEditProfile from './_actions/action-edit-profile';
import FileUploadInput from './_components/file-upload-input/file-upload-input';
import revalidatePathsAfterProfileEdit from './_utils/revalidate-paths-after-profile-edit';

const EditProfileForm = ({
  defaultFormData,
  profileImageUrl,
  trainerId,
}: {
  defaultFormData: TrainerDetailsValues;
  profileImageUrl: string | null;
  trainerId: string;
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [state, formAction] = useFormState(actionEditProfile, formDefaultState);
  const { control, handleSubmit, formState } = useForm<TrainerDetailsValues>({
    resolver: zodResolver(trainerDetailsSchema),
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
        await revalidatePathsAfterProfileEdit(trainerId);
        router.push(`/trainers/${trainerId}` as const);
        notify.success('Zapisano zmiany');
      }
    };
    handleAfterFormSubmit();
  }, [router, state.isSuccess, trainerId]);

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
          <AppInputForm<TrainerDetailsValues> control={control} fieldName="profileName" />
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
          onClick={() => router.push(`/trainers/${trainerId}` as const)}
        >
          Anuluj
        </AppButton>
        <AppButtonSubmit
          classes={{ root: 'grow' }}
          disabled={!(formState.isDirty || imageBlob || isDeleting)}
          isValid={formState.isValid}
        >
          Zapisz
        </AppButtonSubmit>
      </div>
    </form>
  );
};

export default EditProfileForm;
