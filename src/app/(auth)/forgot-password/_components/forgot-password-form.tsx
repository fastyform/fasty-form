'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import actionForgotPassword from '@/app/(auth)/forgot-password/_actions/action-forgot-password';
import { forgotPasswordFormSchema, ForgotPasswordFormValues } from '@/app/(auth)/forgot-password/_utils';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import { formDefaultState } from '@/utils/form';
import { SearchParam } from '@/utils/types';

const ForgotPasswordForm = ({ redirectPathParam }: { redirectPathParam: SearchParam }) => {
  const [state, formAction] = useFormState(actionForgotPassword, formDefaultState);
  const { control, handleSubmit, formState, reset } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: '' },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (state?.isSuccess) {
      reset();
    }
  }, [state, reset]);

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction({ data, redirectPathParam }))();

  return (
    <form action={handleFormAction} className="flex flex-col gap-5">
      <AppFormState state={state} />
      <AppInputForm<ForgotPasswordFormValues> control={control} fieldName="email" label="Email" />
      <AppButtonSubmit isValid={formState.isValid}>Wyślij prośbę o reset hasła</AppButtonSubmit>
    </form>
  );
};

export default ForgotPasswordForm;
