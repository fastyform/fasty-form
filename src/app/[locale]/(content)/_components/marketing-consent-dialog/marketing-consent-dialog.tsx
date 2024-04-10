'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import AppButton from '@/components/app-button';
import AppDialog from '@/components/app-dialog';
import actionUpdateMarketingConsent from './actions/action-update-marketing-consent';

const MarketingConsentDialog = ({
  shouldDisplayMarketingConsentModal,
}: {
  shouldDisplayMarketingConsentModal: boolean;
}) => {
  const updateNotificationsMutation = useMutation({
    mutationFn: (marketingConsent: boolean) => actionUpdateMarketingConsent(marketingConsent),
  });

  return (
    <AppDialog classes={{ paper: 'max-w-sm' }} open={shouldDisplayMarketingConsentModal}>
      <div className="flex flex-col items-center gap-5 text-white">
        <Image alt="Ikonka sukcesu" className="h-[90px] w-[90px]" height={90} src="/mail.svg" width={90} />
        <div className="flex flex-col items-center justify-center gap-2.5">
          <h3 className="text-2xl font-semibold">Odblokuj oferty specjalne i najnowsze aktualizacje!</h3>
          <p className="text-sm font-light opacity-85">
            Chcesz być na bieżąco z ekskluzywnymi zniżkami, poradami oraz aktualizacjami? Zapisz się do newslettera.
            (opcjonalne)
          </p>
        </div>
        <div className="flex w-full flex-wrap gap-5">
          <AppButton
            classes={{ contained: 'bg-inherit text-white', root: 'py-2.5 grow' }}
            className="text-sm"
            onClick={() => updateNotificationsMutation.mutate(false)}
          >
            Nie teraz
          </AppButton>
          <AppButton
            classes={{ root: 'py-2.5 grow' }}
            className="text-sm"
            onClick={() => updateNotificationsMutation.mutate(true)}
          >
            Zapisz się
          </AppButton>
        </div>
      </div>
    </AppDialog>
  );
};

export default MarketingConsentDialog;
