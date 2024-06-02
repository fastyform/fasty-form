'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AppButton from '@/components/app-button';
import AppModal from '@/components/app-modal';

const paramToIconPath = {
  verified: 'success',
  error: 'fail',
  pending_verification: 'success',
} as const;

type FinishedOnboardingParamType = keyof typeof paramToIconPath;

const isFinishedOnboardingParam = (param: string): param is FinishedOnboardingParamType =>
  Object.keys(paramToIconPath).includes(param);

const OnboardingStripeStatusDialog = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const successParam = searchParams.get('stripe_onboarding_status');

  if (!successParam || !isFinishedOnboardingParam(successParam)) return null;

  const icon = paramToIconPath[successParam];

  const handleModalClose = () => {
    router.replace('/payments');
  };

  return (
    <AppModal open={!!successParam} onClose={handleModalClose}>
      <div className="flex flex-col items-center gap-5 text-white">
        <Image alt="" className="h-[90px] w-[90px]" height={90} src={`/${icon}.svg`} width={90} />
        <div className="flex flex-col gap-2.5">
          <h2 className="text-center text-base font-bold">
            {t(`PAYMENTS_ONBOARDING_STATUS_DIALOG_TITLE_${successParam}`)}
          </h2>
          <p className="text-center text-sm">{t(`PAYMENTS_ONBOARDING_STATUS_DIALOG_DESCRIPTION_${successParam}`)}</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <AppButton color="secondary" size="small" variant="text" onClick={handleModalClose}>
            {t('COMMON_CLOSE')}
          </AppButton>
        </div>
      </div>
    </AppModal>
  );
};

export default OnboardingStripeStatusDialog;
