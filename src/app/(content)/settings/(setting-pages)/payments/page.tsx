import Link from 'next/link';
import AppButton from '@/components/app-button';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';
import { Database } from '@/utils/supabase/supabase';
import RedirectToStripeDashboardForm from './_components/redirect-to-stripe-dashboard-form';
import RedirectToStripeOnboardingForm from './_components/redirect-to-stripe-onboarding-form';

type PaymentPageData = {
  [K in Database['public']['Enums']['stripe_onboarding_status']]: [string, () => JSX.Element];
};

const PendingVerificationButton = () => (
  <AppButton disabled classes={{ root: 'py-2.5 w-fit' }}>
    Trwa weryfikacja
  </AppButton>
);

const paymentPageData: PaymentPageData = {
  verified: ['Zajrzyj na swój panel płatności, aby śledzić swoje zarobki.', RedirectToStripeDashboardForm],
  unverified: ['Połącz swoje konto ze Stripe, by zacząć zarabiać.', RedirectToStripeOnboardingForm],
  pending_verification: ['Twoje konto jest w trakcie weryfikacji.', PendingVerificationButton],
};

const PaymentsPage = async () => {
  const user = await getUserFromSession();
  const trainerDetails = await getTrainerDetailsById(user.id);
  const [settingsSubTitle, Button] = paymentPageData[trainerDetails.stripe_onboarding_status];

  return (
    <>
      <div className="flex flex-col gap-2.5 text-white">
        <h1 className="text-2xl">Płatności</h1>
        <p>{settingsSubTitle}</p>
      </div>
      <Button />
      <div className="text-white">
        <span className="font-bold">Kiedy otrzymasz należność?</span>
        <br />
        <span className="font-bold text-yellow-400">3-7 dni roboczych</span>
        <span> po zakończonej i ocenionej przez Ciebie analizie wideo. </span>
        <br />
        <br />
        <span>
          Więcej informacji znajdziesz w{' '}
          <Link className="font-bold text-yellow-400" href="/terms-of-service?should-navigate-back=true">
            regulaminie.
          </Link>
        </span>
      </div>
    </>
  );
};

export default PaymentsPage;
