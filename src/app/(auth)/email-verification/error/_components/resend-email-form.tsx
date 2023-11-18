'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { twMerge } from 'tailwind-merge';
import actionResendEmailConfirmation from '@/app/(auth)/email-verification/error/_actions/action-resend-email-confirmation';
import { formSchema, FormValues } from '@/app/(auth)/email-verification/error/_utils';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';

const SubmitButton = ({ isValid }: { isValid: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <AppButton className="w-full" loading={pending && isValid} type="submit">
      Wyślij ponownie link aktywacyjny
    </AppButton>
  );
};

const ResetEmailForm = () => {
  const [state, formAction] = useFormState(actionResendEmailConfirmation, { message: '', isSuccess: false });
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction(data))();

  return (
    <form action={handleFormAction} className="flex w-full flex-col items-center gap-8">
      {state.message && (
        <span
          className={twMerge(
            'inline-flex items-center gap-2 text-sm text-red-400',
            state.isSuccess && 'text-green-400',
          )}
        >
          {!state.isSuccess && (
            <div>
              <ErrorIcon className="min-w-[17px]" />
            </div>
          )}
          {state.message}
        </span>
      )}
      <AppInputForm<FormValues> className="w-full" control={control} fieldName="email" label="Email" />
      <SubmitButton isValid={formState.isValid} />
    </form>
  );
};

export default ResetEmailForm;
