'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import actionPaymentOnboardingRedirect from '@/app/(content)/settings/(setting-pages)/payments/_actions/action-payment-onboarding-redirect';
import AppButtonSubmit from '@/components/app-button-submit';
import { formDefaultState } from '@/utils/form';
import notify from '@/utils/notify';

const RedirectToStripeOnboardingForm = () => {
  const [state, formAction] = useFormState(actionPaymentOnboardingRedirect, formDefaultState);

  useEffect(() => {
    if (!state.isSuccess && state.message) {
      notify.error(state.message);
    }
  }, [state.isSuccess, state.message]);

  return (
    <form action={formAction}>
      <AppButtonSubmit isValid classes={{ root: 'py-2.5' }}>
        Połącz
      </AppButtonSubmit>
    </form>
  );
};

export default RedirectToStripeOnboardingForm;
