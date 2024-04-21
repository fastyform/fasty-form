import { useTranslations } from 'next-intl';
import AppButton from '@/components/app-button';

const PaymentsPendingVerification = () => {
  const t = useTranslations();

  return (
    <div className="flex w-full flex-col gap-8 self-center sm:max-w-lg md:mx-auto">
      <div className="flex flex-col gap-2.5 text-white">
        <h1 className="text-2xl">{t('PAYMENTS_UNVERIFIED_TITLE')}</h1>
        <p className="max-w-lg">{t('PAYMENTS_PENDING_DESCRIPTION')}</p>
      </div>
      <AppButton disabled classes={{ root: 'py-2.5 w-fit' }}>
        {t('PAYMENTS_PENDING_BUTTON')}
      </AppButton>
    </div>
  );
};

export default PaymentsPendingVerification;
