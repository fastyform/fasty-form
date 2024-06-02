'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import actionForgotPassword from '@/app/[locale]/(auth)/forgot-password/action-forgot-password';
import { forgotPasswordFormSchema, ForgotPasswordFormValues } from '@/app/[locale]/(auth)/forgot-password/utils';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import { SearchParam } from '@/utils/types';

const ForgotPasswordForm = ({ redirectPathParam }: { redirectPathParam: SearchParam }) => {
  const t = useTranslations();
  const { control, handleSubmit, reset } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema(t)),
    defaultValues: { email: '' },
    mode: 'onTouched',
  });

  const forgotActionMutation = useMutation({
    mutationFn: async (email: string) => actionForgotPassword({ email, redirectPathParam }),
    onSuccess: () => reset(),
  });

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit((values) => forgotActionMutation.mutate(values.email))}
    >
      {forgotActionMutation.isSuccess && <span className="text-sm text-green-400">{t('FORGOT_FORM_SUCCESS')}</span>}
      {forgotActionMutation.isError && (
        <span className="inline-flex items-center gap-2 text-sm text-red-400">
          <ErrorIcon className="min-w-[17px]" />
          {t('COMMON_ERROR')}
        </span>
      )}
      <AppInputForm control={control} fieldName="email" label="Email" />
      <AppButton loading={forgotActionMutation.isPending} size="large" type="submit">
        {t('FORGOT_FORM_SUBMIT')}
      </AppButton>
    </form>
  );
};

export default ForgotPasswordForm;
