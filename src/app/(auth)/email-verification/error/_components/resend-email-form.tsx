'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import actionResendEmailConfirmation from '@/app/(auth)/email-verification/error/_actions/action-resend-email-confirmation';
import { formSchema, FormValues } from '@/app/(auth)/email-verification/error/_utils';
import AppButton from '@/components/app-button';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import { formDefaultState } from '@/utils/form';

const SubmitButton = ({ isValid }: { isValid: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <AppButton className="w-full" loading={pending && isValid} type="submit">
      Wyślij ponownie link aktywacyjny
    </AppButton>
  );
};

const ResetEmailForm = () => {
  const [state, formAction] = useFormState(actionResendEmailConfirmation, formDefaultState);
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction(data))();

  return (
    <form action={handleFormAction} className="flex w-full flex-col items-center gap-8">
      <AppFormState state={state} />
      <AppInputForm<FormValues> className="w-full" control={control} fieldName="email" label="Email" />
      <SubmitButton isValid={formState.isValid} />
    </form>
  );
};

export default ResetEmailForm;
