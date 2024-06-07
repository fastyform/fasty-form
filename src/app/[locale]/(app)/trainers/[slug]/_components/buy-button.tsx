'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import actionRedirectToCheckout from '@/app/[locale]/(app)/(content)/_actions/action-redirect-to-checkout';
import AppButton from '@/components/app-button';
import notify from '@/utils/notify';

interface BuyButtonProps {
  trainerId: string;
  isTrainerAccount: boolean;
}

const BuyButton = ({ trainerId, isTrainerAccount }: BuyButtonProps) => {
  const t = useTranslations();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const redirectToCheckoutMutation = useMutation({
    mutationFn: () =>
      actionRedirectToCheckout({
        trainerId,
        cancelUrl: window.location.href,
        successUrl: `${window.origin}/payment/success?stripe_session_id={CHECKOUT_SESSION_ID}`,
      }),
    onError: () => {
      setIsRedirecting(false);
      notify.error(t('COMMON_ERROR'));
    },
    onMutate: () => setIsRedirecting(true),
  });

  return (
    <AppButton
      disabled={isTrainerAccount}
      loading={redirectToCheckoutMutation.isPending || isRedirecting}
      size="large"
      onClick={() => redirectToCheckoutMutation.mutate()}
    >
      {isTrainerAccount ? t('TRAINERS_PAGE_BUY_BUTTON_TRAINER') : t('TRAINERS_PAGE_BUY_BUTTON')}
    </AppButton>
  );
};

export default BuyButton;
