import { useTranslations } from 'next-intl';
import RedirectToStripeOnboardingForm from './redirect-to-stripe-onboarding-form';

const PaymentsUnverified = () => {
  const t = useTranslations();

  return (
    <div className="flex w-full flex-col gap-8 self-center sm:max-w-lg md:mx-auto">
      <div className="flex flex-col gap-2.5 text-white">
        <h1 className="text-2xl">{t('PAYMENTS_UNVERIFIED_TITLE')}</h1>
        <p>{t('PAYMENTS_ACTIVATE_DESCRIPTION')}</p>
      </div>
      <RedirectToStripeOnboardingForm />
    </div>
  );
};

export default PaymentsUnverified;
