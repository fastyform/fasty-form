'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import { emailValidator } from '@/utils/validators';

const formSchema = z.object({ email: emailValidator });

type FormValues = z.infer<typeof formSchema>;

const ResetEmailForm = () => {
  const { control } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  return (
    <form className="flex flex-col items-center gap-8">
      <AppInputForm<FormValues> className="w-72" control={control} fieldName="email" label="Email" />

      <AppButton>Wyślij ponownie link aktywacyjny</AppButton>
    </form>
  );
};

export default ResetEmailForm;
