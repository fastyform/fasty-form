'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import AppButton from '@/components/app-button';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputPrice from '@/components/app-input/app-input-price';
import { formDefaultState } from '@/utils/form';
import actionEditProfile from './_actions/action-edit-profile';
import FileUploadInput from './_components/file-upload-input/file-upload-input';
import { editProfileFormSchema, EditProfileFormValues } from './_utils';
import revalidatePathServer from './_utils/revalidate-path-server';

const SubmitButton = ({ isValid, disabled }: { isValid: boolean; disabled: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <AppButton classes={{ root: 'grow' }} disabled={disabled} loading={pending && isValid} type="submit">
      Zapisz
    </AppButton>
  );
};

const EditProfileForm = ({
  defaultFormData,
  profileImageUrl,
  trainerId,
}: {
  defaultFormData: EditProfileFormValues;
  profileImageUrl: string | null;
  trainerId: string;
}) => {
  const router = useRouter();
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [state, formAction] = useFormState(actionEditProfile, formDefaultState);
  const { control, handleSubmit, formState } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: defaultFormData,
    mode: 'onTouched',
  });

  const handleFormAction = (data: FormData) => handleSubmit(async () => formAction(data))();

  useEffect(() => {
    if (state.isSuccess) {
      revalidatePathServer(`/trainers/${trainerId}`);
      router.back();
    }
  }, [router, state.isSuccess, trainerId]);

  return (
    <form action={handleFormAction} className="flex flex-col gap-5">
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
          <AppInputForm<EditProfileFormValues> control={control} fieldName="profileName" />
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <span className="mr-auto text-white">Zdjęcie profilowe</span>
          <FileUploadInput imageBlob={imageBlob} profileImageUrl={profileImageUrl} setImageBlob={setImageBlob} />
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        <AppButton
          classes={{ root: 'py-2.5 bg-inherit grow' }}
          className="text-sm text-white"
          onClick={() => router.back()}
        >
          Anuluj
        </AppButton>
        <SubmitButton disabled={!(formState.isDirty || imageBlob)} isValid={formState.isValid} />
      </div>
    </form>
  );
};

export default EditProfileForm;
