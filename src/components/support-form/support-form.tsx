'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AppButton from '@/components/app-button';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import { supportFormSchema, SupportFormValues } from '@/components/support-form/_utils';
import { formDefaultState } from '@/utils/form';
import actionSendSupportTicket from './_actions/action-send-support-ticket';

const SubmitButton = ({ isValid }: { isValid: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <AppButton classes={{ root: 'py-2.5' }} loading={pending && isValid} type="submit">
      Wyślij
    </AppButton>
  );
};

const SupportForm = () => {
  const [state, formAction] = useFormState(actionSendSupportTicket, formDefaultState);
  const { control, handleSubmit, formState, reset } = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: { message: '' },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (state?.isSuccess) {
      reset();
    }
  }, [state, reset]);

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction(data))();

  return (
    <form action={handleFormAction} className="flex flex-col items-start gap-5">
      <AppFormState state={state} />
      <AppInputForm<SupportFormValues>
        fullWidth
        multiline
        control={control}
        fieldName="message"
        minRows={5}
        placeholder="Wiadomość"
      />
      <SubmitButton isValid={formState.isValid} />
    </form>
  );
};

export default SupportForm;
