'use server';

import { redirect } from 'next/navigation';
import getStripe from '@/app/(content)/stripe/_utils/get-stripe';
import getTrainerDetailsById from '@/app/(content)/trainers/[id]/_utils/get-trainer-details-by-id';
import { getResponse } from '@/utils';
import getUserFromSession from '@/utils/get-user-from-session';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionPaymentOnboardingRedirect = async () => {
  let redirectUrl: string;
  try {
    const user = await getUserFromSession();
    const trainerDetails = await getTrainerDetailsById(user.id);
    const stripe = getStripe();
    const supabase = getSupabaseServerClient();

    const getStripeAccountId = async () => {
      const account = await stripe.accounts.create({ type: 'express', email: user.email });
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
      refresh_url: `http://localhost:3000/stripe/refresh`,
      return_url: `http://localhost:3000/stripe/return`,
      type: 'account_onboarding',
    });

    redirectUrl = accountLink.url;
  } catch {
    return getResponse('Wystąpił błąd, spróbuj ponownie, lub skontaktuj się z nami.');
  }

  return redirect(redirectUrl);
};

export default actionPaymentOnboardingRedirect;
