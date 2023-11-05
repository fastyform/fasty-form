'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import handleLogin from '@/app/(auth)/login/_actions/handle-login';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import { formSchema, FormValues } from './utils';

const SubmitButton = ({ isValid }: { isValid: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <AppButton loading={pending && isValid} type="submit">
      Zaloguj się
    </AppButton>
  );
};

const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(handleLogin, { message: null });
  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  return (
    <>
      <h1 className="w-full text-left text-white">Zaloguj się</h1>
      <form action={(data) => handleSubmit(() => formAction(data))()} className="flex w-96 flex-col gap-4">
        {state?.message && <span>{state.message}</span>}
        <AppInputForm<FormValues> control={control} fieldName="email" label="Email" />
        <AppInputForm<FormValues> control={control} fieldName="password" label="Hasło" type="password" />
        <SubmitButton isValid={formState.isValid} />
      </form>
    </>
  );
};

export default LoginForm;
