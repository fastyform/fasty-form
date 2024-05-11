'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import actionLogin from '@/app/[locale]/(auth)/login/_actions/action-login';
import { formSchema, FormValues } from '@/app/[locale]/(auth)/login/_utils';
import actionLoginGoogle from '@/app/[locale]/(auth)/providers/_actions/action-login-google';
import ButtonGoogle from '@/app/[locale]/(auth)/providers/_components/button-google';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import AppInputFormPassword from '@/components/app-input/app-input-form-password';
import AuthLink from '@/components/auth-link';
import { formDefaultState } from '@/utils/form';
import { SearchParam } from '@/utils/types';

const LoginForm = ({ redirectUrlParam }: { redirectUrlParam: SearchParam }) => {
  const t = useTranslations();
  const [state, formAction] = useFormState(actionLogin, formDefaultState);
  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction({ data, redirectUrlParam }))();

  return (
    <form action={handleFormAction} className="flex flex-col">
      <div className="flex flex-col gap-5 text-sm">
        <AppFormState state={state} />
        <AppInputForm control={control} fieldName="email" label="Email" />
        <AppInputFormPassword control={control} fieldName="password" label={t('COMMON_PASSWORD_LABEL')} />
      </div>
      <AuthLink
        className="mb-7 w-fit self-end px-1 py-2.5 text-xs text-zinc-200 transition-opacity hover:opacity-80"
        href="/forgot-password"
        redirectUrlParam={redirectUrlParam}
      >
        {t('LOGIN_FORGOT_PASSWORD')}
      </AuthLink>
      <div className="flex flex-col gap-2">
        <AppButtonSubmit isValid={formState.isValid}>{t('COMMON_LOGIN_CTA')}</AppButtonSubmit>
        <span className="text-center text-zinc-200">{t('COMMON_OR')}</span>
        <ButtonGoogle authCallback={() => actionLoginGoogle(redirectUrlParam)}>{t('COMMON_LOGIN_CTA')}</ButtonGoogle>
      </div>
    </form>
  );
};

export default LoginForm;
