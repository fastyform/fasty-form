import { ReactNode } from 'react';
import getLoggedInUser from '@/utils/get-logged-in-user';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';

const PaymentsLayout = async ({
  verified,
  pending_verification,
  unverified,
}: {
  verified: ReactNode;
  unverified: ReactNode;
  pending_verification: ReactNode;
}) => {
  const user = await getLoggedInUser();
  const trainerDetails = await getTrainerDetailsById(user.id);

  const onboardingStatusToRoute = { unverified, pending_verification, verified };

  return <>{onboardingStatusToRoute[trainerDetails.stripe_onboarding_status]}</>;
};

export default PaymentsLayout;
