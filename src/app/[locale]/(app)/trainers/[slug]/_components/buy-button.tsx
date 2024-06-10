'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import actionRedirectToCheckout from '@/app/[locale]/(app)/(content)/_actions/action-redirect-to-checkout';
import AppButton, { AppButtonProps } from '@/components/app-button';
import notify from '@/utils/notify';

interface BuyButtonProps extends AppButtonProps {
  trainerId: string;
}

const BuyButton = ({ trainerId, ...props }: BuyButtonProps) => {
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
      {...props}
      loading={redirectToCheckoutMutation.isPending || isRedirecting}
      onClick={() => redirectToCheckoutMutation.mutate()}
    />
  );
};

export default BuyButton;
