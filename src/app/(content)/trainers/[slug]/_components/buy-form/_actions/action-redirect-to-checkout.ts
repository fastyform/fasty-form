'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import calculateStripeFee from '@/app/(stripe)/stripe/_utils/calculate-stripe-fee';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import StripeConstants from '@/app/(stripe)/stripe/_utils/stripe-constants';
import { getResponse } from '@/utils';
import Constants from '@/utils/constants';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';

const getReceiptDescription = (trainerStripeAccount: Stripe.Account) => {
  const { business_type } = trainerStripeAccount;
  let description = 'Zakup analizy techniki na podstawie wideo od: ';

  if (business_type === 'individual') {
    description += `${trainerStripeAccount.business_profile?.name}`;
  }

  if (business_type === 'company') {
    const { company: { name, address } = {}, metadata } = trainerStripeAccount;
    const companyAddress = `Adres: ${address?.city}, ${address?.line1} ${address?.line2} ${address?.postal_code}`;
    const companyNIP = `NIP: ${metadata?.nip}`;
    const companyDescription = [name, companyNIP, companyAddress];
    description += companyDescription.join('; ');
  }

  return description;
};

const actionRedirectToCheckout = async (payload: { trainerId: string; isTrainerAccount: boolean }) => {
  const headersList = headers();
  const { trainerId, isTrainerAccount } = payload;
  if (isTrainerAccount) getResponse(Constants.COMMON_ERROR_MESSAGE);

  const trainerDetails = await getTrainerDetailsById(trainerId);
  const stripe = getStripe();
  const user = await getUserWithNull();

  if (
    !trainerDetails.stripe_account_id ||
    !trainerDetails.service_price_in_grosz ||
    !trainerDetails.stripe_price_id ||
    !trainerDetails.profile_slug
  )
    throw new Error();

  if (!user || !user.email) return redirect(`/login?redirectUrl=/trainers/${trainerDetails.profile_slug}`);

  const stripeFee = calculateStripeFee(trainerDetails.service_price_in_grosz);

  const trainerStripeAccount = await stripe.accounts.retrieve({ stripeAccount: trainerDetails.stripe_account_id });

  const session = await stripe.checkout.sessions.create(
    {
      line_items: [
        {
          price: trainerDetails.stripe_price_id,
          quantity: 1,
        },
      ],
      payment_intent_data: {
        description: getReceiptDescription(trainerStripeAccount),
        application_fee_amount: stripeFee,
      },
      metadata: {
        trainerId,
        userId: user.id,
        userEmail: user.email,
        trainerProfileSlug: trainerDetails.profile_slug,
        priceAfterFees: trainerDetails.service_price_in_grosz - stripeFee,
      },
      mode: 'payment',
      success_url: `${headersList.get('origin')}/stripe/payment/success?order_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headersList.get('origin')}/stripe/payment/failure?trainer_profile_slug=${
        trainerDetails.profile_slug
      }`,
      locale: 'pl',
      currency: StripeConstants.CURRENCY,
    },
    { stripeAccount: trainerDetails.stripe_account_id },
  );

  if (!session.url) throw new Error();

  return redirect(session.url);
};
export default actionRedirectToCheckout;
