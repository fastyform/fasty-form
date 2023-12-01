import getTrainerDetailsById from '@/app/(content)/trainers/[id]/_utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';
import OnboardingStripeStatusDialog from './_components/onboarding-stripe-status-dialog';
import RedirectToStripeDashboardForm from './_components/redirect-to-stripe-dashboard-form';
import RedirectToStripeOnboardingForm from './_components/redirect-to-stripe-onboarding-form';

const PaymentsPage = async () => {
  const user = await getUserFromSession();
  const trainerDetails = await getTrainerDetailsById(user.id);

  const settingsSubTitle = trainerDetails.is_onboarded_stripe
    ? 'Wejdź na dashboard i sprawdź swoje zarobki.'
    : 'Połącz swoje konto ze Stripe, aby móc zarabiać.';

  return (
    <>
      <div className="flex flex-col gap-2.5 text-white">
        <h1 className="text-2xl">Płatności</h1>
        <p>{settingsSubTitle}</p>
      </div>
      <OnboardingStripeStatusDialog />
      {trainerDetails.is_onboarded_stripe ? <RedirectToStripeDashboardForm /> : <RedirectToStripeOnboardingForm />}
    </>
  );
};

export default PaymentsPage;
