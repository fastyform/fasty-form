'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControlLabel, InputAdornment, Radio, RadioGroup, RadioProps } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import actionPaymentOnboardingRedirect from '@/app/(content)/settings/(setting-pages)/payments/_actions/action-payment-onboarding-redirect';
import {
  stripeOnboardingSchema,
  StripeOnboardingValues,
} from '@/app/(content)/settings/(setting-pages)/payments/utils';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import Constants from '@/utils/constants';
import notify from '@/utils/notify';

const RadioButton = (props: RadioProps) => <Radio {...props} className="text-yellow-400" />;

const RedirectToStripeOnboardingForm = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const actionPaymentOnboardingRedirectMutation = useMutation({
    mutationFn: (values: StripeOnboardingValues) => actionPaymentOnboardingRedirect(values),
    onError: () => {
      notify.error(Constants.COMMON_ERROR_MESSAGE);
      setIsRedirecting(false);
    },
    onMutate: () => setIsRedirecting(true),
  });

  const { handleSubmit, control, watch } = useForm<StripeOnboardingValues>({
    defaultValues: {
      businessType: 'individual',
      firstName: '',
      lastName: '',
      nip: '',
    },
    resolver: zodResolver(stripeOnboardingSchema),
  });

  return (
    <form
      className="flex flex-col items-start gap-6"
      onSubmit={handleSubmit((values) => actionPaymentOnboardingRedirectMutation.mutate(values))}
    >
      <div className="flex flex-col items-start gap-1">
        <span className="text-white">Typ biznesu</span>
        <Controller
          control={control}
          name="businessType"
          render={({ field }) => (
            <RadioGroup className="flex-row gap-4" value={field.value} onChange={(_, value) => field.onChange(value)}>
              <FormControlLabel
                classes={{ label: 'text-white' }}
                control={<RadioButton />}
                label="Osoba fizyczna"
                value="individual"
              />
              <FormControlLabel
                classes={{ label: 'text-white' }}
                control={<RadioButton />}
                label="Firma"
                value="company"
              />
            </RadioGroup>
          )}
        />
      </div>
      <div className="flex w-full max-w-[400px] flex-col gap-4">
        {watch('businessType') === 'individual' ? (
          <>
            <AppInputForm control={control} fieldName="firstName" label="Imię" />
            <AppInputForm control={control} fieldName="lastName" label="Nazwisko" />
          </>
        ) : (
          <AppInputForm
            control={control}
            fieldName="nip"
            label="Nip"
            placeholder="0123456789"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="text-white opacity-80">PL</span>
                </InputAdornment>
              ),
            }}
          />
        )}
      </div>
      <AppButton
        classes={{ root: 'py-2.5' }}
        loading={actionPaymentOnboardingRedirectMutation.isPending || isRedirecting}
        type="submit"
      >
        Połącz
      </AppButton>
    </form>
  );
};

export default RedirectToStripeOnboardingForm;
