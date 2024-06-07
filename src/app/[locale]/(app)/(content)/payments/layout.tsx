import { ReactNode } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Locale } from '@/utils/constants';
import getLoggedInUser from '@/utils/get-logged-in-user';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';

const PaymentsLayout = async ({
  verified,
  pending_verification,
  unverified,
  params: { locale },
}: {
  verified: ReactNode;
  unverified: ReactNode;
  pending_verification: ReactNode;
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);
  const user = await getLoggedInUser();
  const trainerDetails = await getTrainerDetailsById(user.id);

  const onboardingStatusToRoute = { unverified, pending_verification, verified };

  return <>{onboardingStatusToRoute[trainerDetails.stripe_onboarding_status]}</>;
};

export default PaymentsLayout;
