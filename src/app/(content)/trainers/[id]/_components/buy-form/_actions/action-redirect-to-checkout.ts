'use server';

import { redirect } from 'next/navigation';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';

const actionRedirectToCheckout = async (
  prevState: FormState,
  payload: { trainerId: string; isTrainerAccount: boolean },
) => {
  const { trainerId, isTrainerAccount } = payload;
  // TODO CHANGE RESPONSE FOR COMMON ERROR
  if (isTrainerAccount) getResponse('Wystąpił błąd, spróbuj ponownie, lub skontaktuj się z nami.');

  let redirectUrl: string;
  const trainerDetails = await getTrainerDetailsById(trainerId);
  const stripe = getStripe();
  const user = await getUserWithNull();

  if (!user) return redirect(`/login?redirectUrl=/trainers/${trainerId}`);

  if (!trainerDetails.stripe_account_id || !trainerDetails.service_price || !trainerDetails.stripe_price_id)
    throw new Error();

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: trainerDetails.stripe_price_id,
          quantity: 1,
        },
      ],
      payment_intent_data: {
        transfer_data: {
          destination: trainerDetails.stripe_account_id,
        },
        on_behalf_of: trainerDetails.stripe_account_id,
      },
      metadata: {
        trainerId,
        userId: user.id,
      },
      mode: 'payment',
      success_url: 'http://localhost:3000/stripe/payment/success?order_id={CHECKOUT_SESSION_ID}',
      cancel_url: `http://localhost:3000/stripe/payment/failure?trainer_id=${trainerId}`,
      locale: 'pl',
    });

    if (!session.url) throw new Error();

    redirectUrl = session.url;
  } catch {
    return getResponse('Wystąpił błąd, spróbuj ponownie, lub skontaktuj się z nami.');
  }

  return redirect(redirectUrl);
};

export default actionRedirectToCheckout;
