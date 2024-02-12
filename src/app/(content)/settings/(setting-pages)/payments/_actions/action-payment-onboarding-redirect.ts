'use server';

import { redirect } from 'next/navigation';
import {
  stripeOnboardingSchema,
  StripeOnboardingValues,
} from '@/app/(content)/settings/(setting-pages)/payments/utils';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import StripeConstants from '@/app/(stripe)/stripe/_utils/stripe-constants';
import Constants, { PRODUCTION_ORIGIN_URL } from '@/utils/constants';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const STRIPE_MERCHANT_CATEGORY_CODE = '7392';

const actionPaymentOnboardingRedirect = async (payload: StripeOnboardingValues) => {
  const user = await getUserFromSession();
  const trainerDetails = await getTrainerDetailsById(user.id);
  const stripe = getStripe();
  const supabase = getSupabaseServerClient();

  const parsedPayload = stripeOnboardingSchema.parse(payload);

  if (!trainerDetails.service_price_in_grosz || !trainerDetails.profile_slug) throw new Error();

  const getStripeAccountId = async () => {
    const account = await stripe.accounts.create({
      default_currency: StripeConstants.CURRENCY,
      country: 'PL',
      type: 'custom',
      business_type: parsedPayload.businessType,
      email: user.email,
      ...(parsedPayload.businessType === 'individual' && {
        individual: {
          first_name: parsedPayload.firstName,
          last_name: parsedPayload.lastName,
          email: user.email,
        },
      }),
      capabilities: {
        blik_payments: { requested: true },
        card_payments: { requested: true },
        transfers: { requested: true },
        p24_payments: { requested: true },
      },
      settings: { payouts: { schedule: { interval: 'manual' } } },
      business_profile: {
        ...(parsedPayload.businessType === 'individual' && {
          name: `${parsedPayload.firstName} ${parsedPayload.lastName}`,
        }),
        mcc: STRIPE_MERCHANT_CATEGORY_CODE,
        url: `${PRODUCTION_ORIGIN_URL}/trainers/${trainerDetails.profile_slug}`,
      },
      ...(parsedPayload.businessType === 'company' && { metadata: { nip: parsedPayload.nip } }),
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
    refresh_url: `${Constants.ORIGIN_URL}/stripe/onboarding/refresh?payload=${encodeURIComponent(
      JSON.stringify(parsedPayload),
    )}`,
    return_url: `${Constants.ORIGIN_URL}/stripe/onboarding/return`,
    type: 'account_onboarding',
  });

  return redirect(accountLink.url);
};

export default actionPaymentOnboardingRedirect;
