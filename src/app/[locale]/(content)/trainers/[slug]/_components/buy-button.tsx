'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import actionRedirectToCheckout from '@/app/[locale]/(content)/trainers/[slug]/_actions/action-redirect-to-checkout';
import AppButton from '@/components/app-button';
import notify from '@/utils/notify';

const BuyButton = ({ trainerId, isTrainerAccount }: { trainerId: string; isTrainerAccount: boolean }) => {
  const t = useTranslations();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const redirectToCheckoutMutation = useMutation({
    mutationFn: () => actionRedirectToCheckout({ trainerId, isTrainerAccount }),
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
      onClick={() => redirectToCheckoutMutation.mutate()}
    >
      {isTrainerAccount ? t('TRAINERS_PAGE_BUY_BUTTON_TRAINER') : t('TRAINERS_PAGE_BUY_BUTTON')}
    </AppButton>
  );
};

export default BuyButton;
