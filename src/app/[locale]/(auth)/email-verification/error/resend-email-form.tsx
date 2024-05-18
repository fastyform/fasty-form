'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import actionResendEmailConfirmation from '@/app/[locale]/(auth)/email-verification/error/action-resend-email-confirmation';
import { formSchema } from '@/app/[locale]/(auth)/email-verification/error/utils';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import { formDefaultState } from '@/utils/form';

const ResetEmailForm = () => {
  const t = useTranslations();
  const [state, formAction] = useFormState(actionResendEmailConfirmation, formDefaultState);
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema(t)),
    defaultValues: { email: '' },
  });

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction(data))();

  return (
    <form action={handleFormAction} className="flex w-full flex-col items-center gap-8">
      <AppFormState state={state} />
      <AppInputForm className="w-full" control={control} fieldName="email" label="Email" />
      <AppButtonSubmit className="w-full" isValid={formState.isValid}>
        {t('EMAIL_VERIFICATION_ERROR_RESEND')}
      </AppButtonSubmit>
    </form>
  );
};

export default ResetEmailForm;
