'use server';

import { redirect } from 'next/navigation';
import getStripe from '@/app/(content)/stripe/_utils/get-stripe';
import getTrainerDetailsById from '@/app/(content)/trainers/[id]/_utils/get-trainer-details-by-id';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';

const actionRedirectToCheckout = async (prevState: FormState, trainerId: string) => {
  let redirectUrl: string;
  const trainerDetails = await getTrainerDetailsById(trainerId);
  const stripe = getStripe();
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
      },
      mode: 'payment',
      success_url: 'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:3000/payment/failure',
    });
    if (!session.url) throw new Error();

    redirectUrl = session.url;
  } catch {
    return getResponse('Wystąpił błąd, spróbuj ponownie, lub skontaktuj się z nami.');
  }

  return redirect(redirectUrl);
};

export default actionRedirectToCheckout;
