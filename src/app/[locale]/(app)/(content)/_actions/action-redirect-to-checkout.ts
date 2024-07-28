'use server';

import crypto from 'crypto';
import { redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import Stripe from 'stripe';
import { Locale } from '@/utils/constants';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';
import { calculateAppFee, StripeConstants } from '@/utils/stripe';
import getStripe from '@/utils/stripe/get-stripe';
import { IntlShape } from '@/utils/types';

const getReceiptDescription = (trainerStripeAccount: Stripe.Account, t: IntlShape) => {
  const { business_type } = trainerStripeAccount;
  let description = t('PAYMENTS_RECEIPT_DESCRIPTION');

  if (business_type === 'individual') {
    description += `${trainerStripeAccount.business_profile?.name}`;
  }

  if (business_type === 'company') {
    const { company: { name, address } = {}, metadata } = trainerStripeAccount;
    const companyAddress = `${t('PAYMENTS_RECEIPT_ADDRESS')} ${address?.city}, ${address?.line1} ${address?.line2} ${address?.postal_code}`;
    const companyNIP = `${t('PAYMENTS_RECEIPT_NIP')} ${metadata?.nip}`;
    const companyDescription = [name, companyNIP, companyAddress];
    description += companyDescription.join('; ');
  }

  return description;
};

interface Payload {
  trainerId: string;
  successUrl: string;
  cancelUrl: string;
}

const actionRedirectToCheckout = async ({ trainerId, successUrl, cancelUrl }: Payload) => {
  const t = await getTranslations();
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

  if (!user || !user.email)
    return redirect(`/login?redirectUrl=/trainers/${trainerDetails.profile_slug}&purchase=true`);

  const appFee = calculateAppFee(trainerDetails.service_price_in_grosz);

  const trainerStripeAccount = await stripe.accounts.retrieve({ stripeAccount: trainerDetails.stripe_account_id });

  const newSubmissionIdMetadata = { submissionId: crypto.randomUUID() };

  const locale = await getLocale();

  const session = await stripe.checkout.sessions.create(
    {
      line_items: [
        {
          price: trainerDetails.stripe_price_id,
          quantity: 1,
        },
      ],
      payment_intent_data: {
        description: getReceiptDescription(trainerStripeAccount, t),
        application_fee_amount: appFee,
        receipt_email: user.email,
        metadata: {
          ...newSubmissionIdMetadata,
        },
      },
      metadata: {
        trainerId,
        userId: user.id,
        userEmail: user.email,
        trainerProfileSlug: trainerDetails.profile_slug,
        ...newSubmissionIdMetadata,
      },
      customer_email: user.email,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      locale: locale as Locale,
      currency: StripeConstants.CURRENCY,
    },
    { stripeAccount: trainerDetails.stripe_account_id },
  );

  if (!session.url) throw new Error();

  return redirect(session.url);
};
export default actionRedirectToCheckout;
