'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import actionSendSupportTicket from '@/app/(content)/settings/(setting-pages)/support/_actions/action-send-support-ticket';
import { supportFormSchema, SupportFormValues } from '@/app/(content)/settings/(setting-pages)/support/_utils';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import { formDefaultState } from '@/utils/form';

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
    <form action={handleFormAction} className="flex max-w-md flex-col items-start gap-5">
      <AppFormState state={state} />
      <AppInputForm<SupportFormValues>
        fullWidth
        multiline
        control={control}
        fieldName="message"
        minRows={5}
        placeholder="Wiadomość"
      />
      <AppButtonSubmit classes={{ root: 'py-2.5' }} isValid={formState.isValid}>
        Wyślij
      </AppButtonSubmit>
    </form>
  );
};

export default SupportForm;
