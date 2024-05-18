'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, FormControlLabel, InputAdornment } from '@mui/material';
import { useTranslations } from 'next-intl';
import slugify from 'slugify';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputPrice from '@/components/app-input/app-input-price';
import { formDefaultState } from '@/utils/form';
import actionOnboarding from './action-onboarding';
import { onboardingFormSchema, OnboardingFormValues } from './utils';

export const NOT_ALLOWED_SLUG_CHARS_REGEX = /[*+~.()'"!:@#^`=[{\]}\\]/g;
const slugifyWithOptions = (text: string) =>
  slugify(text, { replacement: '-', lower: true, remove: NOT_ALLOWED_SLUG_CHARS_REGEX });

const OnboardingForm = () => {
  const t = useTranslations();
  const [state, formAction] = useFormState(actionOnboarding, formDefaultState);
  const [shouldSlugify, setShouldSlugify] = useState(true);
  const { control, handleSubmit, formState, watch, setValue, setError, resetField } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema(t)),
    defaultValues: { servicePrice: 20, profileName: '', profileSlug: '', marketingConsent: false },
    mode: 'onTouched',
  });

  const profileNameInputValue = watch('profileName');

  const handleFormAction = (data: FormData) => handleSubmit(async () => formAction(data))();

  useEffect(() => {
    if (state.message === t('ONBOARDING_ERROR_LINK_EXISTS')) {
      setError('profileSlug', {}, { shouldFocus: true });
    }
  }, [setError, state.message, t]);

  return (
    <form action={handleFormAction} className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-5 text-sm">
        <AppFormState state={state} />
        <div className="flex flex-col gap-2.5 ">
          <span className="text-white">{t.rich('ONBOARDING_FORM_SERVICE_PRICE_LABEL')}</span>
          <Controller
            control={control}
            name="servicePrice"
            render={({ field }) => (
              <AppInputPrice name="servicePrice" value={field.value} onChange={(_, value) => field.onChange(value)} />
            )}
          />
        </div>
        <div className="flex flex-col gap-2.5 ">
          <span className="text-white">{t('COMMON_PROFILE_NAME')}</span>
          <AppInputForm
            control={control}
            fieldName="profileName"
            onBlur={(e) => {
              if (shouldSlugify) {
                setValue('profileSlug', slugifyWithOptions(e.target.value), { shouldValidate: true });
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-2.5 ">
          <span className="text-white">{t('ONBOARDING_LINK_LABEL')}</span>
          <span className="text-xs text-white">{t('ONBOARDING_LINK_CAPTION')}</span>
          <AppInputForm
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
                setShouldSlugify(true);
                resetField('profileSlug', { keepError: true });

                return;
              }
              if (e.target.value !== slugifyWithOptions(profileNameInputValue)) {
                setShouldSlugify(false);
              }
            }}
          />
        </div>
        <Controller
          control={control}
          name="marketingConsent"
          render={({ field }) => (
            <FormControlLabel
              classes={{ label: 'text-xs' }}
              label={<span className="text-zinc-200">{t('ONBOARDING_MARKETING_CONSENT_LABEL')}</span>}
              control={
                <Checkbox
                  checked={field.value}
                  classes={{ root: 'text-zinc-200' }}
                  name="marketingConsent"
                  value={field.value}
                  onChange={(_, checked) => field.onChange(checked)}
                />
              }
            />
          )}
        />
      </div>
      <AppButtonSubmit isValid={formState.isValid}>{t('ONBOARDING_BUTTON_SUBMIT')}</AppButtonSubmit>
    </form>
  );
};

export default OnboardingForm;
