'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import handleLogin from '@/app/(auth)/login/_actions/handle-login';
import AppInputForm from '@/components/app-input/app-input-form';
import { formSchema, FormValues } from './utils';

const LoginForm = (): JSX.Element => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const onSubmit = (data: FormValues) => {
    handleLogin(data);
  };

  return (
    <form className="flex w-96 flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <AppInputForm<FormValues> control={control} fieldName="email" label="Email" />
      <AppInputForm<FormValues> control={control} fieldName="password" label="Hasło" type="password" />
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
