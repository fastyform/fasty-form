'use server';

import { redirect } from 'next/navigation';
import getTrainerDetailsById from '@/app/(content)/trainers/[id]/_utils/get-trainer-details-by-id';
import { getResponse } from '@/utils';
import getUserFromSession from '@/utils/get-user-from-session';
import getStripe from '@/utils/stripe/get-stripe';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionPaymentOnboardingRedirect = async () => {
  let redirectUrl: string;
  try {
    const user = await getUserFromSession();
    const trainerDetails = await getTrainerDetailsById(user.id);
    const stripe = getStripe();
    const supabase = getSupabaseServerClient();

    const getStripeAccountId = async () => {
      if (!trainerDetails.stripe_account_id) {
        const account = await stripe.accounts.create({
          type: 'express',
          email: user.email,
        });
        await supabase.from('trainers_details').update({ stripe_account_id: account.id }).eq('user_id', user.id);

        return account.id;
      }

      return trainerDetails.stripe_account_id;
    };

    const accountLink = await stripe.accountLinks.create({
      account: await getStripeAccountId(),
      refresh_url: `http://localhost:3000/stripe/refresh`,
      return_url: `http://localhost:3000/stripe/return`,
      type: 'account_onboarding',
    });

    redirectUrl = accountLink.url;
  } catch {
    return getResponse('Wystąpił błąd, spróbuj ponownie, lub skontaktuj się z nami.', false);
  }

  return redirect(redirectUrl);
};

export default actionPaymentOnboardingRedirect;
