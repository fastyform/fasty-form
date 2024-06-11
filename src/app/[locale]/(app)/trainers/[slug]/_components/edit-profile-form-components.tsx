'use client';

import { FormHTMLAttributes } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import {
  editPriceFormSchema,
  getProfileBioFormSchema,
  getProfileNameFormSchema,
} from '@/app/[locale]/(app)/trainers/[slug]/_utils/utils';
import { actionEditBio, actionEditPrice, actionEditProfileName } from '@/app/[locale]/(app)/trainers/[slug]/actions';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputPrice from '@/components/app-input/app-input-price';
import notify from '@/utils/notify';

export const FormContainer = ({ className, ...props }: FormHTMLAttributes<HTMLFormElement>) => (
  <form className={twMerge('flex flex-col gap-2.5', className)} {...props} />
);

interface EditPriceFormProps {
  servicePrice: number;
  trainerProfileSlug: string;
}

export const EditPriceForm = ({ servicePrice, trainerProfileSlug }: EditPriceFormProps) => {
  const t = useTranslations();
  const form = useForm({
    resolver: zodResolver(editPriceFormSchema),
    defaultValues: { servicePrice },
  });

  const editPriceMutation = useMutation({
    mutationFn: () => actionEditPrice({ servicePrice: form.getValues('servicePrice'), trainerProfileSlug }),
    onSuccess: () => {
      form.reset(form.getValues());
      notify.success(t('COMMON_CHANGES_SAVED'));
    },
    onError: () => notify.error(t('TRAINERS_EDIT_PROFILE_ERROR_SAVE')),
  });

  return (
    <FormContainer onSubmit={form.handleSubmit(() => editPriceMutation.mutate())}>
      <span className="text-white">
        {t('TRAINERS_EDIT_PROFILE_PRICE_LABEL')} <span className="text-yellow-400">({t('CURRENCY_PLN')})</span>
      </span>
      <Controller
        control={form.control}
        name="servicePrice"
        render={({ field }) => (
          <AppInputPrice name="servicePrice" value={field.value} onChange={(_, value) => field.onChange(value)} />
        )}
      />
      <AppButton
        className="self-end"
        disabled={!form.formState.isDirty}
        loading={editPriceMutation.isPending}
        type="submit"
        variant="text"
      >
        {t('COMMON_SAVE')}
      </AppButton>
    </FormContainer>
  );
};

interface EditProfileNameFormProps {
  profileName: string;
  trainerProfileSlug: string;
}

export const EditProfileNameForm = ({ profileName, trainerProfileSlug }: EditProfileNameFormProps) => {
  const t = useTranslations();
  const form = useForm({
    resolver: zodResolver(getProfileNameFormSchema(t)),
    defaultValues: { profileName },
  });

  const profileNameMutation = useMutation({
    mutationFn: () => actionEditProfileName({ profileName: form.getValues('profileName'), trainerProfileSlug }),
    onSuccess: () => {
      form.reset(form.getValues());
      notify.success(t('COMMON_CHANGES_SAVED'));
    },
    onError: () => notify.error(t('TRAINERS_EDIT_PROFILE_ERROR_SAVE')),
  });

  return (
    <FormContainer onSubmit={form.handleSubmit(() => profileNameMutation.mutate())}>
      <span className="text-white">{t('COMMON_PROFILE_NAME')}</span>
      <AppInputForm control={form.control} fieldName="profileName" />
      <AppButton
        className="self-end"
        disabled={!form.formState.isDirty}
        loading={profileNameMutation.isPending}
        type="submit"
        variant="text"
      >
        {t('COMMON_SAVE')}
      </AppButton>
    </FormContainer>
  );
};

interface EditBioFormProps {
  bio: string;
  trainerProfileSlug: string;
}

export const EditBioForm = ({ bio, trainerProfileSlug }: EditBioFormProps) => {
  const t = useTranslations();
  const form = useForm({
    resolver: zodResolver(getProfileBioFormSchema(t)),
    defaultValues: { bio },
  });

  const editBioMutation = useMutation({
    mutationFn: () => actionEditBio({ bio: form.getValues('bio'), trainerProfileSlug }),
    onSuccess: () => {
      form.reset(form.getValues());
      notify.success(t('COMMON_CHANGES_SAVED'));
    },
    onError: () => notify.error(t('TRAINERS_EDIT_PROFILE_ERROR_SAVE')),
  });

  return (
    <FormContainer onSubmit={form.handleSubmit(() => editBioMutation.mutate())}>
      <span className="text-white">{t('COMMON_PROFILE_BIO')}</span>
      <AppInputForm multiline control={form.control} fieldName="bio" rows={5} />
      <AppButton
        className="self-end"
        disabled={!form.formState.isDirty}
        loading={editBioMutation.isPending}
        type="submit"
        variant="text"
      >
        {t('COMMON_SAVE')}
      </AppButton>
    </FormContainer>
  );
};
