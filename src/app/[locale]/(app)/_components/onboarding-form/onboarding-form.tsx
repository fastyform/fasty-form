'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, FormControlLabel, InputAdornment } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import slugify from 'slugify';
import { socialToIconMap } from '@/app/[locale]/(app)/trainers/[slug]/_components/edit-profile-form-components';
import { SOCIAL_LINKS } from '@/app/[locale]/(app)/trainers/[slug]/_utils/utils';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputPrice from '@/components/app-input/app-input-price';
import notify from '@/utils/notify';
import actionOnboarding from './action-onboarding';
import { onboardingFormSchema, OnboardingFormValues } from './utils';

export const NOT_ALLOWED_SLUG_CHARS_REGEX = /[*+~.()'"!:@#^`=[{\]}\\]/g;
const slugifyWithOptions = (text: string) =>
  slugify(text, { replacement: '-', lower: true, remove: NOT_ALLOWED_SLUG_CHARS_REGEX });

const RequiredMark = () => <span className="pr-0.5 text-red-400">*</span>;

const OnboardingForm = () => {
  const t = useTranslations();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [shouldSlugify, setShouldSlugify] = useState(true);
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema(t)),
    defaultValues: {
      servicePrice: 20,
      profileName: '',
      profileSlug: '',
      bio: '',
      socialLinks: { instagram: '', facebook: '', youtube: '', tiktok: '' },
      marketingConsent: false,
    },
  });

  const onboardingMutation = useMutation({
    mutationFn: () => actionOnboarding(form.getValues()),
    onMutate: () => setIsRedirecting(true),
    onSuccess: (data) => {
      if (data.isSuccess) {
        return;
      }

      setIsRedirecting(false);
      if (data.messageKey === 'ONBOARDING_ERROR_LINK_EXISTS') {
        form.setError('profileSlug', { message: t('ONBOARDING_ERROR_LINK_EXISTS') }, { shouldFocus: true });
        
return;
      }

      notify.error(t('COMMON_ERROR'));
    },
  });

  const profileNameInputValue = form.watch('profileName');

  return (
    <form className="flex w-full flex-col gap-5" onSubmit={form.handleSubmit(() => onboardingMutation.mutate())}>
      <div className="flex flex-col gap-5 text-sm">
        <div className="flex flex-col gap-2.5">
          <span className="text-white">
            <RequiredMark />
            {t.rich('ONBOARDING_FORM_SERVICE_PRICE_LABEL')}{' '}
            <span className="text-yellow-400">({t('CURRENCY_PLN')})</span>
          </span>
          <Controller
            control={form.control}
            name="servicePrice"
            render={({ field }) => (
              <AppInputPrice name="servicePrice" value={field.value} onChange={(_, value) => field.onChange(value)} />
            )}
          />
        </div>
        <div className="flex flex-col gap-2.5 ">
          <span className="text-white">
            <RequiredMark />
            {t('COMMON_PROFILE_NAME')}
          </span>
          <AppInputForm
            control={form.control}
            fieldName="profileName"
            onBlur={(e) => {
              if (shouldSlugify) {
                form.setValue('profileSlug', slugifyWithOptions(e.target.value), { shouldValidate: true });
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-2.5 ">
          <span className="text-white">
            <RequiredMark />
            {t('ONBOARDING_LINK_LABEL')}
          </span>
          <span className="text-xs text-white">{t('ONBOARDING_LINK_CAPTION')}</span>
          <AppInputForm
            control={form.control}
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
                form.resetField('profileSlug', { keepError: true });

                return;
              }
              if (e.target.value !== slugifyWithOptions(profileNameInputValue)) {
                setShouldSlugify(false);
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-2.5 ">
          <span className="text-white">{t('COMMON_PROFILE_BIO')}</span>
          <AppInputForm multiline control={form.control} fieldName="bio" rows={5} />
        </div>
        <div className="flex flex-col gap-2.5 ">
          <span className="text-white">{t('TRAINERS_EDIT_PROFILE_SOCIAL_LINKS')}</span>
          <div className="flex flex-col gap-2.5">
            {SOCIAL_LINKS.map((type) => {
              const Icon = socialToIconMap[type];

              return (
                <div key={type} className="flex items-center gap-2.5">
                  <Icon className="size-10 text-white" />
                  <AppInputForm
                    className="grow"
                    control={form.control}
                    fieldName={`socialLinks.${type}`}
                    placeholder={`https://www.${type}.com`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Controller
          control={form.control}
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
      <AppButton loading={onboardingMutation.isPending || isRedirecting} size="large" type="submit">
        {t('ONBOARDING_BUTTON_SUBMIT')}
      </AppButton>
    </form>
  );
};

export default OnboardingForm;
