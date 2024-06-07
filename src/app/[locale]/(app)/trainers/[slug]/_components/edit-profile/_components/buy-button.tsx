'use client';

import { useState } from 'react';
import { LoadingButtonProps, LoadingButtonTypeMap } from '@mui/lab';
import { ButtonBaseProps } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import actionRedirectToCheckout from '@/app/[locale]/(app)/(content)/_actions/action-redirect-to-checkout';
import AppButton from '@/components/app-button';
import notify from '@/utils/notify';

interface BuyButtonProps
  extends LoadingButtonProps<LoadingButtonTypeMap['defaultComponent'], { component?: ButtonBaseProps['component'] }> {
  trainerId: string;
  isTrainerAccount: boolean;
}

const BuyButton = ({ trainerId, isTrainerAccount, ...props }: BuyButtonProps) => {
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
      onClick={(e) => {
        e.preventDefault();
        redirectToCheckoutMutation.mutate();
      }}
      {...props}
    >
      {isTrainerAccount ? t('TRAINERS_PAGE_BUY_BUTTON_TRAINER') : t('TRAINERS_PAGE_BUY_BUTTON')}
    </AppButton>
  );
};

export default BuyButton;
