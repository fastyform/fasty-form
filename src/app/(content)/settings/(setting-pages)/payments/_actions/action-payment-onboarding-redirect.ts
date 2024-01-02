'use server';

import { redirect } from 'next/navigation';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import StripeConstants from '@/app/(stripe)/stripe/_utils/stripe-constants';
import { getResponse } from '@/utils';
import Constants from '@/utils/constants';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const STRIPE_MERCHANT_CATEGORY_CODE = '7392';

const actionPaymentOnboardingRedirect = async () => {
  let redirectUrl: string;
  try {
    const user = await getUserFromSession();
    const trainerDetails = await getTrainerDetailsById(user.id);
    const stripe = getStripe();
    const supabase = getSupabaseServerClient();
    if (!trainerDetails.service_price_in_grosz) throw new Error();

    const getStripeAccountId = async () => {
      const account = await stripe.accounts.create({
        default_currency: StripeConstants.CURRENCY,
        country: 'PL',
        type: 'express',
        email: user.email,
        settings: { payouts: { schedule: { interval: 'manual' } } },
        business_profile: {
          mcc: STRIPE_MERCHANT_CATEGORY_CODE,
          product_description:
            'Usługa analizy techniki klienta, polegająca na ocenie i komentarzu do wideo przesłanego przez klienta.',
        },
      });

      const { error } = await supabase
        .from('trainers_details')
        .update({ stripe_account_id: account.id })
        .eq('user_id', user.id);

      if (error) stripe.accounts.del(account.id);

      return account.id;
    };

    const stripeAccountId = trainerDetails.stripe_account_id || (await getStripeAccountId());

    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${Constants.ORIGIN_URL}/stripe/onboarding/refresh`,
      return_url: `${Constants.ORIGIN_URL}/stripe/onboarding/return`,
      type: 'account_onboarding',
    });

    redirectUrl = accountLink.url;
  } catch {
    return getResponse(Constants.COMMON_ERROR_MESSAGE);
  }

  return redirect(redirectUrl);
};

export default actionPaymentOnboardingRedirect;
