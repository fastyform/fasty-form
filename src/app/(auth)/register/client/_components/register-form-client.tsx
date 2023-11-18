'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, FormControlLabel } from '@mui/material';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import ProviderButton from '@/app/(auth)/_components/provider-button';
import actionRegisterClient from '@/app/(auth)/register/client/_actions/action-register-client';
import { formSchema, FormValues } from '@/app/(auth)/register/client/_utils';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';

const SubmitButton = ({ isValid }: { isValid: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <AppButton loading={pending && isValid} type="submit">
      Zarejestruj się
    </AppButton>
  );
};

const RegisterFormClient = () => {
  const [state, formAction] = useFormState(actionRegisterClient, { message: '', isSuccess: false });
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

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction(data))();

  return (
    <form action={handleFormAction} className="flex flex-col">
      <div className="flex flex-col gap-5">
        {state.message && (
          <span
            className={twMerge(
              'inline-flex items-center gap-2 text-sm text-red-400',
              state.isSuccess && 'text-green-400',
            )}
          >
            {!state.isSuccess && <ErrorIcon className="min-w-[17px]" />}
            {state.message}
          </span>
        )}
        <AppInputForm<FormValues> control={control} fieldName="email" label="Email" />
        <AppInputForm<FormValues>
          autoComplete="new-password"
          control={control}
          fieldName="password"
          label="Hasło"
          type="password"
        />
      </div>
      <div className="mb-8 ml-3 mt-4">
        <Controller
          control={control}
          name="policy"
          render={({ field, fieldState }) => (
            <div className="flex w-fit flex-col">
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
      <div className="flex flex-col gap-5">
        <SubmitButton isValid={formState.isValid} />
        <span className="text-center text-zinc-200">Lub</span>
        <ProviderButton icon={<Image alt="google" height={19} src="/google.svg" width={19} />}>
          Kontynuuj z&nbsp;<span className="font-bold">Google</span>
        </ProviderButton>
        <ProviderButton icon={<Image alt="apple" height={19} src="/apple.svg" width={19} />}>
          Kontynuuj z&nbsp;<span className="font-bold">Apple</span>
        </ProviderButton>
      </div>
    </form>
  );
};

export default RegisterFormClient;
