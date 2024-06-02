'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import actionUpdateMarketingConsent from '@/app/[locale]/(content)/_actions/action-update-marketing-consent';
import AppButtonNew from '@/components/app-button-new';
import AppModal from '@/components/app-modal';

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
    <AppModal
      DialogProps={{ classes: { paper: 'max-w-sm' } }}
      open={shouldDisplayMarketingConsentModal}
      onClose={() => updateNotificationsMutation.mutate(false)}
    >
      <div className="flex flex-col items-center gap-5 text-white">
        <Image alt="" className="h-[90px] w-[90px]" height={90} src="/mail.svg" width={90} />
        <div className="flex flex-col items-center justify-center gap-2.5 text-center">
          <h3 className="text-2xl font-semibold">{t('MARKETING_CONSENT_DIALOG_TITLE')}</h3>
          <p className="text-sm font-light opacity-85">{t('MARKETING_CONSENT_DIALOG_DESCRIPTION')}</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <AppButtonNew color="secondary" variant="text" onClick={() => updateNotificationsMutation.mutate(false)}>
            {t('MARKETING_CONSENT_DIALOG_DECLINE_BUTTON')}
          </AppButtonNew>
          <AppButtonNew onClick={() => updateNotificationsMutation.mutate(true)}>
            {t('MARKETING_CONSENT_DIALOG_ACCEPT_BUTTON')}
          </AppButtonNew>
        </div>
      </div>
    </AppModal>
  );
};

export default MarketingConsentDialog;
