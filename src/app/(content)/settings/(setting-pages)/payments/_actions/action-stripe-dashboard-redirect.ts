'use server';

import { redirect } from 'next/navigation';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import { getResponse } from '@/utils';
import Constants from '@/utils/constants';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';

const actionStripeDashboardRedirect = async () => {
  let redirectUrl: string;
  try {
    const stripe = getStripe();
    const user = await getUserFromSession();

    const trainerDetails = await getTrainerDetailsById(user.id);
    if (!trainerDetails.stripe_account_id) throw new Error();

    const dashboardLink = await stripe.accounts.createLoginLink(trainerDetails.stripe_account_id);

    redirectUrl = dashboardLink.url;
  } catch {
    return getResponse(Constants.COMMON_ERROR_MESSAGE);
  }

  return redirect(redirectUrl);
};

export default actionStripeDashboardRedirect;
