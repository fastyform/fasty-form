'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import actionSendContactForm from '@/app/[locale]/(public)/(info)/contact/_actions/action-send-contact-form';
import { contactFormSchema, ContactFormValues } from '@/app/[locale]/(public)/(info)/contact/_utils';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import { formDefaultState } from '@/utils/form';

const ContactForm = ({ userEmail }: { userEmail?: string }) => {
  const t = useTranslations();
  const [state, formAction] = useFormState(actionSendContactForm, formDefaultState);
  const { control, handleSubmit, formState, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema(t)),
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
      <AppInputForm fullWidth control={control} fieldName="email" label="Email" />
      <AppInputForm
        fullWidth
        multiline
        control={control}
        fieldName="message"
        label={t('CONTACT_FORM_MESSAGE_LABEL')}
        minRows={5}
      />
      <AppButtonSubmit isValid={formState.isValid}>{t('COMMON_SEND')}</AppButtonSubmit>
    </form>
  );
};

export default ContactForm;
