'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import ProviderButton from '@/app/(auth)/_components/provider-button';
import actionSignIn from '@/app/(auth)/login/_actions/action-sign-in';
import { formSchema, FormValues } from '@/app/(auth)/login/_utils';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';

const SubmitButton = ({ isValid }: { isValid: boolean }) => {
  const { pending } = useFormStatus();

  const isLoading = pending && isValid;

  return (
    <AppButton disabled={isLoading} loading={isLoading} type="submit">
      Zaloguj się
    </AppButton>
  );
};

const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(actionSignIn, { message: null });
  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  // TODO: Strange bug in html form action
  const handleFormAction = (data: FormData) => handleSubmit(() => formAction(data))();

  return (
    <form action={handleFormAction} className="flex flex-col">
      <div className="flex flex-col gap-5">
        {state?.message && <span className="text-red-400">{state.message}</span>}
        <AppInputForm<FormValues> control={control} fieldName="email" label="Email" />
        <AppInputForm<FormValues> control={control} fieldName="password" label="Hasło" type="password" />
      </div>
      <Link className="mb-7 w-fit self-end px-1 py-2.5 text-xs text-zinc-200" href="/">
        Zapomniałem hasła
      </Link>
      <div className="flex flex-col gap-5">
        <SubmitButton isValid={formState.isValid} />
        <span className="text-center text-zinc-200">Lub</span>
        <ProviderButton icon={<Image alt="google" height={19} src="/google.svg" width={19} />}>
          Kontynuuj z&nbsp;<span className="font-bold">Google</span>
        </ProviderButton>

        <ProviderButton icon={<Image alt="apple" height={19} src="/apple.svg" width={19} />}>
          Kontynuuj z&nbsp;<span className="font-bold">Apple</span>
        </ProviderButton>
        <Link className="w-fit self-center text-white" href="/register/client">
          Nie masz konta? <span className="font-bold text-yellow-400">Zarejestruj się</span>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
