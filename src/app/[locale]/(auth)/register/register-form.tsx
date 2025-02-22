'use client';

import { ReactNode, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import actionRegisterTrainerGoogle from '@/app/[locale]/(auth)/providers/_actions/action-register-trainer-google';
import actionSignInGoogle from '@/app/[locale]/(auth)/providers/_actions/action-sign-in-google';
import ButtonGoogle from '@/app/[locale]/(auth)/providers/_components/button-google';
import { FormValues, registerSchema } from '@/app/[locale]/(auth)/utils';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputFormPassword from '@/components/app-input/app-input-form-password';
import { Locale } from '@/utils/constants';
import { formDefaultState } from '@/utils/form';
import { Database } from '@/utils/supabase/supabase';
import { SearchParam } from '@/utils/types';
import actionRegister from './action-register';

const TosLink = (chunks: ReactNode) => (
  <Link className="font-bold" href="/terms-of-service" rel="noopener" target="_blank">
    {chunks}
  </Link>
);

const PolicyLink = (chunks: ReactNode) => (
  <Link className="font-bold" href="/privacy-policy" rel="noopener" target="_blank">
    {chunks}
  </Link>
);

const NonBreakingSpace = () => <>&nbsp;</>;

interface RegisterFormProps {
  redirectPathParam: SearchParam;
  userRole: Database['public']['Enums']['role'];
  locale: Locale;
}

const RegisterForm = ({ redirectPathParam, userRole, locale }: RegisterFormProps) => {
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
    handleSubmit(() => formAction({ data, role: userRole, redirectPathParam, locale }))();

  return (
    <form action={handleFormAction} className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <AppFormState state={state} />
        <AppInputForm control={control} fieldName="email" label="Email" />
        <AppInputFormPassword
          autoComplete="new-password"
          control={control}
          fieldName="password"
          label={t('COMMON_PASSWORD_LABEL')}
        />
      </div>
      <div className="flex flex-col gap-2">
        <AppButtonSubmit isValid={formState.isValid} size="large" type="submit">
          {t('COMMON_REGISTER_CTA')}
        </AppButtonSubmit>
        <span className="text-center text-zinc-200">{t('COMMON_OR')}</span>
        <ButtonGoogle
          authCallback={() =>
            userRole === 'client'
              ? actionSignInGoogle(redirectPathParam)
              : actionRegisterTrainerGoogle(redirectPathParam)
          }
        >
          {t(userRole === 'client' ? 'COMMON_CONTINUE' : 'COMMON_REGISTER_CTA')}
        </ButtonGoogle>
      </div>
      <span className="text-center text-xs text-zinc-200">
        {t.rich('REGISTER_TOS_ACCEPT', {
          TosLink,
          PolicyLink,
          NonBreakingSpace,
        })}
      </span>
    </form>
  );
};

export default RegisterForm;
