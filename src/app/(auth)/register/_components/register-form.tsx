'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, FormControlLabel } from '@mui/material';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { FormValues, registerSchema } from '@/app/(auth)/_utils';
import actionRegisterGoogle from '@/app/(auth)/providers/_actions/action-register-google';
import ButtonGoogle from '@/app/(auth)/providers/_components/button-google';
import actionRegister from '@/app/(auth)/register/_actions/action-register';
import ErrorIcon from '@/assets/error-icon';
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
  const [state, formAction] = useFormState(actionRegister, formDefaultState);
  const { control, handleSubmit, formState, reset, getValues } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', policy: false, marketing_consent: false },
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
        <div className="ml-3 flex w-fit flex-col">
          <Controller
            control={control}
            name="policy"
            render={({ field, fieldState }) => (
              <>
                <FormControlLabel
                  classes={{ label: 'text-xs' }}
                  control={
                    <Checkbox
                      checked={field.value}
                      classes={{ root: twMerge('text-zinc-200', fieldState.invalid && 'text-red-400') }}
                      name="policy"
                      value={field.value}
                      onChange={(_, checked) => field.onChange(checked)}
                    />
                  }
                  label={
                    <span className={twMerge('text-zinc-200', fieldState.invalid && 'text-red-400')}>
                      Akceptuję&nbsp;
                      <Link className="font-bold" href="/terms-of-service" rel="noopener" target="_blank">
                        regulamin.
                      </Link>
                    </span>
                  }
                />
                {fieldState.invalid && (
                  <span className="inline-flex items-center gap-2 text-xs text-red-400">
                    <ErrorIcon />
                    <span>Akceptacja regulaminu jest wymagana.</span>
                  </span>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="marketing_consent"
            render={({ field, fieldState }) => (
              <FormControlLabel
                classes={{ label: 'text-xs' }}
                control={
                  <Checkbox
                    checked={field.value}
                    classes={{ root: twMerge('text-zinc-200', fieldState.invalid && 'text-red-400') }}
                    name="marketing_consent"
                    value={field.value}
                    onChange={(_, checked) => field.onChange(checked)}
                  />
                }
                label={
                  <span className={twMerge('text-zinc-200', fieldState.invalid && 'text-red-400')}>
                    Chcę otrzymywać informacje o promocjach, poradach i nowościach drogą mailową.
                  </span>
                }
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <AppButtonSubmit isValid={formState.isValid} type="submit">
          Zarejestruj się
        </AppButtonSubmit>
        <span className="text-center text-zinc-200">Lub</span>
        <ButtonGoogle
          authCallback={() => actionRegisterGoogle(userRole, redirectPathParam, getValues('marketing_consent'))}
        >
          Zarejestruj się
        </ButtonGoogle>
      </div>
    </form>
  );
};

export default RegisterForm;
