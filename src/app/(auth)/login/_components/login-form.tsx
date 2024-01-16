'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import actionLogin from '@/app/(auth)/login/_actions/action-login';
import { formSchema, FormValues } from '@/app/(auth)/login/_utils';
import actionLoginGoogle from '@/app/(auth)/providers/_actions/action-login-google';
import ButtonGoogle from '@/app/(auth)/providers/_components/button-google';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputFormPassword from '@/components/app-input/app-input-form-password';
import AuthLink from '@/components/auth-link';
import { formDefaultState } from '@/utils/form';
import { SearchParam } from '@/utils/types';

const LoginForm = ({ redirectUrlParam }: { redirectUrlParam: SearchParam }) => {
  const [state, formAction] = useFormState(actionLogin, formDefaultState);
  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction({ data, redirectUrlParam }))();

  return (
    <form action={handleFormAction} className="flex flex-col">
      <div className="flex flex-col gap-5 text-sm">
        <AppFormState state={state} />
        <AppInputForm control={control} fieldName="email" label="Email" />
        <AppInputFormPassword control={control} fieldName="password" label="Hasło" />
      </div>
      <AuthLink
        className="mb-7 w-fit self-end px-1 py-2.5 text-xs text-zinc-200 transition-opacity hover:opacity-80"
        href="/forgot-password"
        redirectUrlParam={redirectUrlParam}
      >
        Zapomniałem hasła
      </AuthLink>
      <div className="flex flex-col gap-2">
        <AppButtonSubmit isValid={formState.isValid}>Zaloguj się</AppButtonSubmit>
        <span className="text-center text-zinc-200">Lub</span>
        <ButtonGoogle authCallback={() => actionLoginGoogle(redirectUrlParam)}>Zaloguj się</ButtonGoogle>
      </div>
    </form>
  );
};

export default LoginForm;
