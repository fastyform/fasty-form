'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import actionUpdateMarketingConsent from '@/app/[locale]/(content)/_actions/action-update-marketing-consent';
import AppButton from '@/components/app-button';
import AppDialog from '@/components/app-dialog';

const MarketingConsentDialog = ({
  shouldDisplayMarketingConsentModal,
}: {
  shouldDisplayMarketingConsentModal: boolean;
}) => {
  const t = useTranslations();
  const updateNotificationsMutation = useMutation({
    mutationFn: (marketingConsent: boolean) => actionUpdateMarketingConsent(marketingConsent),
  });

  return (
    <AppDialog classes={{ paper: 'max-w-sm' }} open={shouldDisplayMarketingConsentModal}>
      <div className="flex flex-col items-center gap-5 text-white">
        <Image alt="Ikonka sukcesu" className="h-[90px] w-[90px]" height={90} src="/mail.svg" width={90} />
        <div className="flex flex-col items-center justify-center gap-2.5">
          <h3 className="text-2xl font-semibold">{t('MARKETING_CONSENT_DIALOG_TITLE')}</h3>
          <p className="text-sm font-light opacity-85">{t('MARKETING_CONSENT_DIALOG_DESCRIPTION')}</p>
        </div>
        <div className="flex w-full flex-wrap gap-5">
          <AppButton
            classes={{ contained: 'bg-inherit text-white', root: 'py-2.5 grow' }}
            className="text-sm"
            onClick={() => updateNotificationsMutation.mutate(false)}
          >
            {t('MARKETING_CONSENT_DIALOG_DECLINE_BUTTON')}
          </AppButton>
          <AppButton
            classes={{ root: 'py-2.5 grow' }}
            className="text-sm"
            onClick={() => updateNotificationsMutation.mutate(true)}
          >
            {t('MARKETING_CONSENT_DIALOG_ACCEPT_BUTTON')}
          </AppButton>
        </div>
      </div>
    </AppDialog>
  );
};

export default MarketingConsentDialog;
