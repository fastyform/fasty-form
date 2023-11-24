'use client';

import { useFormState } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trainerDetailsSchema, TrainerDetailsValues } from '@/app/(content)/_utils/trainer-details-form';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputPrice from '@/components/app-input/app-input-price';
import { formDefaultState } from '@/utils/form';
import actionOnBoarding from './_actions/action-onboarding';

const OnboardingForm = () => {
  const [state, formAction] = useFormState(actionOnBoarding, formDefaultState);
  const { control, handleSubmit, formState } = useForm<TrainerDetailsValues>({
    resolver: zodResolver(trainerDetailsSchema),
    defaultValues: { servicePrice: 1, profileName: '' },
    mode: 'onTouched',
  });

  const handleFormAction = (data: FormData) => handleSubmit(async () => formAction(data))();

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
          <AppInputForm<TrainerDetailsValues> control={control} fieldName="profileName" />
        </div>
      </div>
      <AppButtonSubmit isValid={formState.isValid} />
    </form>
  );
};

export default OnboardingForm;
