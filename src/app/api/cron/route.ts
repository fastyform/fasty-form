import { NextResponse } from 'next/server';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import StripeConstants from '@/app/(stripe)/stripe/_utils/stripe-constants';
import { getSupabaseServerClient } from '@/utils/supabase/client';

type Accumulator = {
  [key: string]: {
    totalPayout: number;
    submissionId: string;
  };
};
const MINIMAL_PAYOUT_IN_GROSZ = 500;

const getNextResponse = (message: string | string[], isSuccess: boolean, status?: number) =>
  NextResponse.json(
    {
      message,
      ok: isSuccess,
    },
    { status },
  );

export async function GET() {
  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const stripe = getStripe();
  const payoutErrors: string[] = [];

  const { data: reviewedSubmissions, error } = await supabase
    .from('submissions')
    .select('id, trainers_details (stripe_account_id), price_in_grosz')
    .eq('status', 'reviewed');

  if (error || !reviewedSubmissions) return getNextResponse(error.message, false);

  if (!reviewedSubmissions.length) return getNextResponse('0 payments made', true, 200);

  const groupedPayouts = reviewedSubmissions.reduce((acc: Accumulator, item) => {
    if (!item.price_in_grosz || !item.trainers_details || !item.trainers_details.stripe_account_id) {
      payoutErrors.push(`Unsuccessfull payment for ${item.trainers_details?.stripe_account_id}. Missing data!`);

      return acc;
    }

    const stripeAccountId = item.trainers_details.stripe_account_id;
    const price = item.price_in_grosz;

    if (acc[stripeAccountId]) {
      acc[stripeAccountId] = {
        ...acc[stripeAccountId],
        totalPayout: acc[stripeAccountId].totalPayout + price,
      };
    } else {
      acc[stripeAccountId] = {
        submissionId: item.id,
        totalPayout: price,
      };
    }

    return acc;
  }, {});

  try {
    const payoutPromises = Object.entries(groupedPayouts).map(
      async ([stripeAccountId, { totalPayout, submissionId }]) => {
        if (totalPayout < MINIMAL_PAYOUT_IN_GROSZ) {
          throw new Error(
            `Minimal payout is 5 zł, account: ${stripeAccountId} has currently ${
              totalPayout / StripeConstants.GROSZ_MULTIPLIER
            } zł`,
          );
        }

        const balance = await stripe.balance.retrieve({
          stripeAccount: stripeAccountId,
        });

        const totalAvailableBalance = balance.available.reduce((acc, item) => acc + item.amount, 0);

        if (totalAvailableBalance < totalPayout) {
          throw new Error(
            `Not sufficient balance for ${stripeAccountId}. Balance: ${totalAvailableBalance}, Payout: ${totalPayout}`,
          );
        }

        await stripe.payouts.create(
          {
            amount: totalPayout,
            currency: StripeConstants.CURRENCY,
          },
          { stripeAccount: stripeAccountId },
        );

        const { error: updateStatusError } = await supabase
          .from('submissions')
          .update({ status: 'paidout' })
          .eq('id', submissionId);

        if (updateStatusError)
          throw new Error(`Something went wrong with updating submission (${submissionId}) status`);
      },
    );

    await Promise.all(payoutPromises.map((p) => p.catch((e) => payoutErrors.push(e.message))));
  } catch (e: any) {
    return getNextResponse(`Something went wrong ${e.message}`, false, 400);
  }

  if (payoutErrors.length) return getNextResponse(payoutErrors, false, 207);

  return getNextResponse('Payouts made', true, 200);
}
