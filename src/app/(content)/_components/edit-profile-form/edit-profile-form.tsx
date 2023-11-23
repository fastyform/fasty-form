'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AppButton from '@/components/app-button';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputPrice from '@/components/app-input/app-input-price';
import { formDefaultState } from '@/utils/form';
import actionEditProfile from './_actions/action-edit-profile';
import { editProfileFormSchema, EditProfileFormValues } from './_utils';

const SubmitButton = ({ isValid }: { isValid: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <AppButton loading={pending && isValid} type="submit">
      Przejdź dalej
    </AppButton>
  );
};

const EditProfileForm = () => {
  const [state, formAction] = useFormState(actionEditProfile, formDefaultState);
  const { control, handleSubmit, formState } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: { servicePrice: 1, profileName: '' },
    mode: 'onTouched',
  });

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction(data))();

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
        <div className="flex flex-col gap-2.5 ">
          <span className="text-white">Nazwa profilu</span>
          <AppInputForm<EditProfileFormValues> control={control} fieldName="profileName" />
        </div>
      </div>
      <SubmitButton isValid={formState.isValid} />
    </form>
  );
};

export default EditProfileForm;
