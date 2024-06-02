'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControlLabel, InputAdornment, Radio, RadioGroup, RadioProps } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { stripeOnboardingSchema, StripeOnboardingValues } from '@/app/[locale]/(content)/payments/utils';
import AppButtonNew from '@/components/app-button-new';
import AppInputForm from '@/components/app-input/app-input-form';
import notify from '@/utils/notify';
import actionPaymentOnboardingRedirect from './action-payment-onboarding-redirect';

const RadioButton = (props: RadioProps) => <Radio {...props} className="text-yellow-400" />;

const RedirectToStripeOnboardingForm = () => {
  const t = useTranslations();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const actionPaymentOnboardingRedirectMutation = useMutation({
    mutationFn: (values: StripeOnboardingValues) => actionPaymentOnboardingRedirect(values),
    onError: () => {
      notify.error(t('COMMON_ERROR'));
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
    resolver: zodResolver(stripeOnboardingSchema(t)),
  });

  return (
    <form
      className="flex flex-col items-start gap-6"
      onSubmit={handleSubmit((values) => actionPaymentOnboardingRedirectMutation.mutate(values))}
    >
      <div className="flex flex-col items-start gap-1">
        <span className="text-white">{t('PAYMENTS_ACTIVATE_FORM_BUSINESS_TYPE_LABEL')}</span>
        <Controller
          control={control}
          name="businessType"
          render={({ field }) => (
            <RadioGroup className="flex-row gap-4" value={field.value} onChange={(_, value) => field.onChange(value)}>
              <FormControlLabel
                classes={{ label: 'text-white' }}
                control={<RadioButton />}
                label={t('PAYMENTS_ACTIVATE_FORM_INDIVIDUAL_LABEL')}
                value="individual"
              />
              <FormControlLabel
                classes={{ label: 'text-white' }}
                control={<RadioButton />}
                label={t('PAYMENTS_ACTIVATE_FORM_COMPANY_LABEL')}
                value="company"
              />
            </RadioGroup>
          )}
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        {watch('businessType') === 'individual' ? (
          <>
            <AppInputForm
              control={control}
              fieldName="firstName"
              label={t('PAYMENTS_ACTIVATE_FORM_FIRST_NAME_LABEL')}
            />
            <AppInputForm control={control} fieldName="lastName" label={t('PAYMENTS_ACTIVATE_FORM_LAST_NAME_LABEL')} />
          </>
        ) : (
          <AppInputForm
            control={control}
            fieldName="nip"
            label={t('PAYMENTS_ACTIVATE_FORM_TAX_ID_LABEL')}
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
      <AppButtonNew loading={actionPaymentOnboardingRedirectMutation.isPending || isRedirecting} type="submit">
        {t('PAYMENTS_ACTIVATE_FORM_BUTTON')}
      </AppButtonNew>
    </form>
  );
};

export default RedirectToStripeOnboardingForm;
