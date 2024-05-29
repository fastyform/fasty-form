'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import actionRedirectToCheckout from '@/app/[locale]/(content)/_actions/action-redirect-to-checkout';
import AppButton from '@/components/app-button';
import notify from '@/utils/notify';

const BuyAgainButton = ({ trainerId }: { trainerId: string }) => {
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
      classes={{ root: 'py-2 self-start' }}
      loading={redirectToCheckoutMutation.isPending || isRedirecting}
      onClick={() => redirectToCheckoutMutation.mutate()}
    >
      {t('SUBMISSION_BUY_AGAIN_BUTTON')}
    </AppButton>
  );
};

export default BuyAgainButton;
