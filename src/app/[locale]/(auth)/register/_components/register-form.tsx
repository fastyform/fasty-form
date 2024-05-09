'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FormValues, registerSchema } from '@/app/[locale]/(auth)/_utils';
import actionRegisterGoogle from '@/app/[locale]/(auth)/providers/_actions/action-register-google';
import ButtonGoogle from '@/app/[locale]/(auth)/providers/_components/button-google';
import actionRegister from '@/app/[locale]/(auth)/register/_actions/action-register';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputFormPassword from '@/components/app-input/app-input-form-password';
import { formDefaultState } from '@/utils/form';
import { Database } from '@/utils/supabase/supabase';
import { SearchParam } from '@/utils/types';

interface RegisterFormProps {
  redirectPathParam: SearchParam;
  userRole: Database['public']['Enums']['role'];
}

const RegisterForm = ({ redirectPathParam, userRole }: RegisterFormProps) => {
  const t = useTranslations();
  const [state, formAction] = useFormState(actionRegister, formDefaultState);
  const { control, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: zodResolver(registerSchema(t)),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (state?.isSuccess) {
      reset();
    }
  }, [state, reset]);

  const handleFormAction = (data: FormData) =>
    handleSubmit(() => formAction({ data, role: userRole, redirectPathParam }))();

  return (
    <form action={handleFormAction} className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <AppFormState state={state} />
        <AppInputForm control={control} fieldName="email" label="Email" />
        <AppInputFormPassword autoComplete="new-password" control={control} fieldName="password" label="Hasło" />
      </div>
      <div className="flex flex-col gap-2">
        <AppButtonSubmit isValid={formState.isValid} type="submit">
          Zarejestruj się
        </AppButtonSubmit>
        <span className="text-center text-zinc-200">Lub</span>
        <ButtonGoogle authCallback={() => actionRegisterGoogle(userRole, redirectPathParam)}>
          Zarejestruj się
        </ButtonGoogle>
      </div>
      <span className="text-center text-xs text-zinc-200">
        Kontynuując rejestrację, akceptujesz{' '}
        <Link className="font-bold" href="/terms-of-service" rel="noopener" target="_blank">
          regulamin
        </Link>{' '}
        i&nbsp;potwierdzasz, że zapoznałeś się z&nbsp;
        <Link className="font-bold" href="/privacy-policy" rel="noopener" target="_blank">
          polityką prywatności
        </Link>
        .
      </span>
    </form>
  );
};

export default RegisterForm;
