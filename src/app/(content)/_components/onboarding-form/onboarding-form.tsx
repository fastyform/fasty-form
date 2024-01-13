'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputAdornment } from '@mui/material';
import slugify from 'slugify';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputPrice from '@/components/app-input/app-input-price';
import { formDefaultState } from '@/utils/form';
import actionOnBoarding from './_actions/action-onboarding';
import { onboardingFormSchema, OnboardingFormValues } from './_utils';

export const NOT_ALLOWED_SLUG_CHARS_REGEX = /[*+~.()'"!:@#^`=[{\]}\\]/g;
const slugifyWithOptions = (text: string) =>
  slugify(text, { replacement: '-', lower: true, remove: NOT_ALLOWED_SLUG_CHARS_REGEX });

const OnboardingForm = () => {
  const [state, formAction] = useFormState(actionOnBoarding, formDefaultState);
  const { control, handleSubmit, formState, watch, getFieldState, setValue, setError, resetField } =
    useForm<OnboardingFormValues>({
      resolver: zodResolver(onboardingFormSchema),
      defaultValues: { servicePrice: 30, profileName: '', profileSlug: '' },
      mode: 'onTouched',
    });

  const profileSlugInputState = getFieldState('profileSlug');
  const profileSlugInputValue = watch('profileSlug');
  const profileNameInputValue = watch('profileName');

  const handleFormAction = (data: FormData) => handleSubmit(async () => formAction(data))();

  useEffect(() => {
    if (state.message === 'Twój link do profilu nie jest unikalny. Spróbuj inny.') {
      setError('profileSlug', {}, { shouldFocus: true });
    }
  }, [setError, state.message]);

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
          <AppInputForm<OnboardingFormValues>
            control={control}
            fieldName="profileName"
            onBlur={(e) => {
              if (!profileNameInputValue) return;

              if (!profileSlugInputState.isTouched || !profileSlugInputValue) {
                setValue('profileSlug', slugifyWithOptions(e.target.value), {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-2.5 ">
          <span className="text-white">Link do profilu</span>
          <span className="text-xs text-white">
            Pamiętaj, że link do Twojego profilu jest stały i nie podlega zmianie. Możesz go swobodnie udostępniać swoim
            klientom, dlatego wybierz go mądrze!
          </span>
          <AppInputForm<OnboardingFormValues>
            control={control}
            fieldName="profileSlug"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="text-xs text-white/50">fastyform.com/trainers/</span>
                </InputAdornment>
              ),
            }}
            onBlur={(e) => {
              if (!e.target.value) {
                resetField('profileSlug', { keepError: true });
              }
            }}
          />
        </div>
      </div>
      <AppButtonSubmit isValid={formState.isValid}>Przejdź dalej</AppButtonSubmit>
    </form>
  );
};

export default OnboardingForm;
