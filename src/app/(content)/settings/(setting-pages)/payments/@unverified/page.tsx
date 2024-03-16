import RedirectToStripeOnboardingForm from './redirect-to-stripe-onboarding-form';

const PaymentsUnverified = () => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-col gap-2.5 text-white">
      <h1 className="text-2xl">Zarobki</h1>
      <p className="max-w-lg">Połącz swoje konto ze Stripe, by zacząć zarabiać.</p>
    </div>
    <RedirectToStripeOnboardingForm />
  </div>
);

export default PaymentsUnverified;
