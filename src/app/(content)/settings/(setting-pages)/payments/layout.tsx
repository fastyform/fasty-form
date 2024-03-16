import { ReactNode } from 'react';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';

const PaymentsLayout = async ({
  dashboard,
  pending,
  unverified,
}: {
  dashboard: ReactNode;
  unverified: ReactNode;
  pending: ReactNode;
}) => {
  const user = await getUserFromSession();
  const trainerDetails = await getTrainerDetailsById(user.id);

  if (trainerDetails.stripe_onboarding_status === 'unverified') {
    return <>{unverified}</>;
  }

  if (trainerDetails.stripe_onboarding_status === 'pending_verification') {
    return <>{pending}</>;
  }

  return <>{dashboard}</>;
};

export default PaymentsLayout;
