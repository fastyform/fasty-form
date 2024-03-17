import { ReactNode } from 'react';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';

const PaymentsLayout = async ({
  verified,
  pending_verification,
  unverified,
}: {
  verified: ReactNode;
  unverified: ReactNode;
  pending_verification: ReactNode;
}) => {
  const user = await getUserFromSession();
  const trainerDetails = await getTrainerDetailsById(user.id);

  const onboardingStatusToRoute = { unverified, pending_verification, verified };

  return <>{onboardingStatusToRoute[trainerDetails.stripe_onboarding_status]}</>;
};

export default PaymentsLayout;
