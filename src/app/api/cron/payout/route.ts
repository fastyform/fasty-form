import { NextRequest } from 'next/server';
import { groszToPLN, StripeConstants } from '@/utils/stripe';
import getStripe from '@/utils/stripe/get-stripe';
import { getSupabaseServerClient } from '@/utils/supabase/client';

type Accumulator = {
  [key: string]: {
    [key: string]: number;
  };
};

type PayOutDataAccumulator = {
  payoutAmount: number;
  submissionIds: string[];
};

const MINIMAL_PAYOUT_IN_GROSZ = 500;

const getResponse = (message: string | string[], status?: number) => {
  const messageFormatted = typeof message === 'string' ? message : JSON.stringify(message);

  return new Response(messageFormatted, {
    status,
  });
};

export async function GET(request: NextRequest) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return getResponse('Unauthorized', 401);
  }

  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const stripe = getStripe();
  const payoutErrors: string[] = [];

  const { data: reviewedSubmissions, error } = await supabase
    .from('submissions')
    .select('id, trainers_details (stripe_account_id), price_in_grosz')
    .eq('status', 'reviewed');

  if (error || !reviewedSubmissions) return getResponse(error.message);

  if (!reviewedSubmissions.length) return getResponse('0 payments made', 200);

  const groupedPayouts = reviewedSubmissions.reduce((acc: Accumulator, item) => {
    if (!item.price_in_grosz || !item.trainers_details || !item.trainers_details.stripe_account_id) {
      payoutErrors.push(`Unsuccessfull payment for ${item.trainers_details?.stripe_account_id}. Missing data!`);

      return acc;
    }

    const stripeAccountId = item.trainers_details.stripe_account_id;
    const price = item.price_in_grosz;

    acc[stripeAccountId] = {
      ...acc[stripeAccountId],
      [item.id]: price,
    };

    return acc;
  }, {});

  try {
    const payoutPromises = Object.entries(groupedPayouts).map(async ([stripeAccountId, submissionPayoutData]) => {
      const totalAccountPayout = Object.values(submissionPayoutData).reduce((acc, item) => acc + item, 0);

      if (totalAccountPayout < MINIMAL_PAYOUT_IN_GROSZ) {
        throw new Error(
          `Minimal payout is 5 zł, account: ${stripeAccountId} has currently ${groszToPLN(totalAccountPayout)} zł`,
        );
      }

      const balance = await stripe.balance.retrieve({
        stripeAccount: stripeAccountId,
      });

      const totalAvailableBalance = balance.available.reduce((acc, item) => acc + item.amount, 0);

      const payoutData = Object.entries(submissionPayoutData).reduce(
        (acc: PayOutDataAccumulator, [submissionId, price]) => {
          if (acc.payoutAmount + price > totalAvailableBalance) return acc;

          return {
            payoutAmount: acc.payoutAmount + price,
            submissionIds: [...acc.submissionIds, submissionId],
          };
        },
        {
          payoutAmount: 0,
          submissionIds: [],
        },
      );

      if (payoutData.payoutAmount > 0 && payoutData.submissionIds.length > 0) {
        await stripe.payouts.create(
          {
            amount: payoutData.payoutAmount,
            currency: StripeConstants.CURRENCY,
          },
          { stripeAccount: stripeAccountId },
        );

        const { error: updateError } = await supabase
          .from('submissions')
          .update({ status: 'paidout' })
          .in('id', payoutData.submissionIds);

        if (updateError) throw new Error(`Something went wrong with updating submissions status`);
      }
    });

    await Promise.all(payoutPromises.map((p) => p.catch((e) => payoutErrors.push(e.message))));
  } catch (e: any) {
    return getResponse(`Something went wrong ${e.message}`, 400);
  }

  if (payoutErrors.length) return getResponse(payoutErrors, 207);

  return getResponse('Payouts made', 200);
}
