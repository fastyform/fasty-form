'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import AppButton from '@/components/app-button';
import Constants from '@/utils/constants';
import notify from '@/utils/notify';
import actionRedirectToCheckout from './_actions/action-redirect-to-checkout';

const BuyButton = ({ trainerId, isTrainerAccount }: { trainerId: string; isTrainerAccount: boolean }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const redirectToCheckoutMutation = useMutation({
    mutationFn: () => actionRedirectToCheckout({ trainerId, isTrainerAccount }),
    onError: () => {
      setIsRedirecting(false);
      notify.error(Constants.COMMON_ERROR_MESSAGE);
    },
    onMutate: () => setIsRedirecting(true),
  });

  return (
    <AppButton
      disabled={isTrainerAccount}
      loading={redirectToCheckoutMutation.isPending || isRedirecting}
      onClick={() => redirectToCheckoutMutation.mutate()}
    >
      {isTrainerAccount ? 'Brak możliwości kupna jako trener' : 'Kup analizę techniki'}
    </AppButton>
  );
};

export default BuyButton;
