'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ProfileSlugInput from '@/app/(content)/_components/onboarding-form/_components/profile-slug-input';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputPrice from '@/components/app-input/app-input-price';
import { formDefaultState } from '@/utils/form';
import actionOnBoarding from './_actions/action-onboarding';
import { onboardingFormSchema, OnboardingFormValues } from './_utils';

const OnboardingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, formAction] = useFormState(actionOnBoarding, formDefaultState);
  const { control, handleSubmit, formState, watch, getFieldState, setValue, setError } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: { servicePrice: 1, profileName: '' },
    mode: 'onTouched',
  });

  const handleFormAction = (data: FormData) => handleSubmit(async () => formAction(data))();

  useEffect(() => {
    if (state.message === 'Twój link do profilu nie jest unikalny. Spróbuj inny.') {
      setError('profileSlug', {}, { shouldFocus: true });
    }
  }, [setError, state.message, state]);

  return (
    <form action={handleFormAction} className="flex w-full flex-col gap-5">
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
          <AppInputForm<OnboardingFormValues> control={control} fieldName="profileName" />
        </div>
        <ProfileSlugInput
          control={control}
          getFieldState={getFieldState}
          setIsLoading={setIsLoading}
          setValue={setValue}
          watch={watch}
        />
      </div>
      <AppButtonSubmit disabled={isLoading} isValid={formState.isValid}>
        Przejdź dalej
      </AppButtonSubmit>
    </form>
  );
};

export default OnboardingForm;
