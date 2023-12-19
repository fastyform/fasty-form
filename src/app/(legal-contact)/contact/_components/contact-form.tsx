'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import actionSendContactForm from '@/app/(legal-contact)/contact/_actions/action-send-contact-form';
import { contactFormSchema, ContactFormValues } from '@/app/(legal-contact)/contact/_utils';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import { formDefaultState } from '@/utils/form';

const ContactForm = ({ userEmail }: { userEmail?: string }) => {
  const [state, formAction] = useFormState(actionSendContactForm, formDefaultState);
  const { control, handleSubmit, formState, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { message: '', email: userEmail || '' },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (state?.isSuccess) {
      reset();
    }
  }, [state, reset]);

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction(data))();

  return (
    <form action={handleFormAction} className="flex max-w-md grow flex-col items-start gap-5">
      <AppFormState state={state} />
      <AppInputForm<ContactFormValues> fullWidth control={control} fieldName="email" label="Email" />
      <AppInputForm<ContactFormValues>
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

export default ContactForm;
