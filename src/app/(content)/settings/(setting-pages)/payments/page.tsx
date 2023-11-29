'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import AppButton from '@/components/app-button';
import AppButtonSubmit from '@/components/app-button-submit';
import AppDialog from '@/components/app-dialog';
import { formDefaultState } from '@/utils/form';
import notify from '@/utils/notify';
import actionPaymentOnboardingRedirect from './_actions/action-payment-onboarding-redirect';

const PaymentsPage = () => {
  const [state, formAction] = useFormState(actionPaymentOnboardingRedirect, formDefaultState);
  const searchParams = useSearchParams();
  const router = useRouter();

  const hasSuccessfullyOnboardedStripe = !!searchParams.get('isSuccess');

  const handleModalClose = () => {
    router.replace('/settings/payments');
  };

  useEffect(() => {
    if (!state.isSuccess && state.message) {
      notify.error(state.message);
    }
  }, [state.isSuccess, state.message]);

  return (
    <>
      <div className="flex flex-col gap-2.5 text-white">
        <h1 className="text-2xl">Płatności</h1>
        <p>Połącz swoje konto ze Stripe, aby móc zarabiać.</p>
      </div>
      <form action={formAction}>
        <AppButtonSubmit isValid classes={{ root: 'py-2.5' }}>
          Połącz
        </AppButtonSubmit>
      </form>
      <AppDialog open={hasSuccessfullyOnboardedStripe} onClose={handleModalClose}>
        <div className="flex flex-col items-center gap-5">
          <Image alt="Obrazek sukcesu" className="h-[90px] w-[90px]" height={90} src="/success.svg" width={90} />
          <div className="flex flex-col gap-2.5">
            <h4 className="text-center text-base font-bold text-white">Gratulacje!</h4>
            <p className="text-center text-sm text-white">
              Udało Ci się połączyć z kontem stripe. Od teraz twoje konto trenera jest aktywne. Twoja strona profilowa,
              jest widoczna dla wszystkich, oraz możesz przyjmować płatności.
            </p>
          </div>
          <div className="flex flex-wrap gap-5">
            <AppButton
              classes={{ root: 'py-2.5 bg-inherit' }}
              className="text-sm text-white"
              onClick={handleModalClose}
            >
              Zamknij
            </AppButton>
          </div>
        </div>
      </AppDialog>
    </>
  );
};

export default PaymentsPage;
