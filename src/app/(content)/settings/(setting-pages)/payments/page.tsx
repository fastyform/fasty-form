import checkIsUserOnboardedStripe from '@/app/(content)/_utils/check-is-user-onboarded-stripe';
import getUserFromSession from '@/utils/get-user-from-session';
import RedirectToStripeDashboardForm from './_components/redirect-to-stripe-dashboard-form';
import RedirectToStripeOnboardingForm from './_components/redirect-to-stripe-onboarding-form';

const PaymentsPage = async () => {
  const user = await getUserFromSession();
  const isOnboardedStripe = await checkIsUserOnboardedStripe(user.id);
  const settingsSubTitle = isOnboardedStripe
    ? 'Wejdź na dashboard i sprawdź swoje zarobki.'
    : 'Połącz swoje konto ze Stripe, aby móc zarabiać.';

  return (
    <>
      <div className="flex flex-col gap-2.5 text-white">
        <h1 className="text-2xl">Płatności</h1>
        <p>{settingsSubTitle}</p>
      </div>
      {isOnboardedStripe ? <RedirectToStripeDashboardForm /> : <RedirectToStripeOnboardingForm />}
    </>
  );
};

export default PaymentsPage;
