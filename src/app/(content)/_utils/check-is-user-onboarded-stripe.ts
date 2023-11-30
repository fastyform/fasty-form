'use server';

import getTrainerDetailsById from '@/app/(content)/trainers/[id]/_utils/get-trainer-details-by-id';

const checkIsUserOnboardedStripe = async (trainerId: string) => {
  const trainerDetails = await getTrainerDetailsById(trainerId);

  return trainerDetails.is_onboarded_stripe;
};

export default checkIsUserOnboardedStripe;
