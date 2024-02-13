import { ComponentType } from 'react';
import AppButton from '@/components/app-button';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';
import { Database } from '@/utils/supabase/supabase';
import RedirectToStripeOnboardingForm from './_components/redirect-to-stripe-onboarding-form';
import StripeDashboard from './_components/stripe-dashboard';

type PaymentPageData = {
  [K in Database['public']['Enums']['stripe_onboarding_status_enum']]: [string, ComponentType];
};

const PendingVerificationButton = () => (
  <AppButton disabled classes={{ root: 'py-2.5 w-fit' }}>
    Trwa weryfikacja
  </AppButton>
);

const paymentPageData: PaymentPageData = {
  verified: [
    'Wypłata na konto bankowe trafia zazwyczaj w 3 do 7 dni roboczych po zakończonej i ocenionej przez Ciebie analizie wideo.',
    StripeDashboard,
  ],
  unverified: ['Połącz swoje konto ze Stripe, by zacząć zarabiać.', RedirectToStripeOnboardingForm],
  pending_verification: ['Twoje konto jest w trakcie weryfikacji.', PendingVerificationButton],
};

const PaymentsPage = async () => {
  const user = await getUserFromSession();
  const trainerDetails = await getTrainerDetailsById(user.id);
  const [settingsSubTitle, Component] = paymentPageData[trainerDetails.stripe_onboarding_status];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2.5 text-white">
        <h1 className="text-2xl">Zarobki</h1>
        <p className="max-w-lg">{settingsSubTitle}</p>
      </div>
      <Component />
    </div>
  );
};

export default PaymentsPage;
