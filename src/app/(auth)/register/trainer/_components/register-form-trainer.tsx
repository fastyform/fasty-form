'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, FormControlLabel } from '@mui/material';
import { twMerge } from 'tailwind-merge';
import RegisterWithGoogle from '@/app/(auth)/providers/_components/register-with-google';
import actionRegister from '@/app/(auth)/register/_actions/action-register';
import { formSchema, FormValues } from '@/app/(auth)/register/trainer/_utils';
import ErrorIcon from '@/assets/error-icon';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import { formDefaultState } from '@/utils/form';

const RegisterFormTrainer = () => {
  const [state, formAction] = useFormState(actionRegister, formDefaultState);
  const { control, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '', policy: false },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (state?.isSuccess) {
      reset();
    }
  }, [state, reset]);

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction({ data, role: 'trainer' }))();

  return (
    <form action={handleFormAction} className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <AppFormState state={state} />
        <AppInputForm<FormValues> control={control} fieldName="email" label="Email" />
        <AppInputForm<FormValues>
          autoComplete="new-password"
          control={control}
          fieldName="password"
          label="Hasło"
          type="password"
        />
        <Controller
          control={control}
          name="policy"
          render={({ field, fieldState }) => (
            <div className="ml-3 flex w-fit flex-col">
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
                    <a className="font-bold" href="www.test-cratun-policy-fastform.com" rel="noopener" target="_blank">
                      regulamin.
                    </a>
                  </span>
                }
              />
              {fieldState.invalid && (
                <span className="inline-flex items-center gap-2 text-xs text-red-400">
                  <ErrorIcon />
                  <span>Akceptacja regulaminu jest wymagana.</span>
                </span>
              )}
            </div>
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <AppButtonSubmit isValid={formState.isValid}>Zarejestruj się</AppButtonSubmit>
        <span className="self-center text-center text-zinc-200">Lub</span>
        <RegisterWithGoogle userRole="trainer" />
      </div>
    </form>
  );
};

export default RegisterFormTrainer;
