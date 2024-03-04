import { render } from '@react-email/render';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import ThankYouBuy from '@/emails/thank-you-buy';
import { sendMail } from '@/utils/mail/send-mail';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const secret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const stripe = getStripe();
  const signature = headers().get('stripe-signature');
  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);

  if (!signature) throw new Error();

  let event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Webhook Error: ${error.message}`,
        ok: false,
      },
      { status: 400 },
    );
  }

  if (event.type === 'checkout.session.completed') {
    try {
      const session = event.data.object;

      if (!session.metadata || !session.metadata.userId || !session.metadata.trainerId || !session.metadata.userEmail) {
        throw new Error('Metadata is empty');
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent as string,
        {
          expand: ['latest_charge.balance_transaction'],
        },
        {
          stripeAccount: event.account,
        },
      );

      const { data: submission, error } = await supabase
        .from('submissions')
        .insert({
          stripe_session_id: session.id,
          client_id: session.metadata.userId,
          trainer_id: session.metadata.trainerId,
          status: 'paid',
          id: session.metadata.submissionId,
          price_in_grosz: (
            (paymentIntent.latest_charge as Stripe.Charge).balance_transaction as Stripe.BalanceTransaction
          ).net,
        })
        .select('id, client_id, trainers_details (profile_name, profile_slug)')
        .single();

      if (
        error ||
        !submission ||
        !submission.client_id ||
        !submission.trainers_details?.profile_name ||
        !submission.trainers_details?.profile_slug
      ) {
        throw new Error(error?.message);
      }

      await sendMail({
        to: session.metadata.userEmail,
        subject: 'Jesteśmy gotowi na Twoje wideo.',
        html: render(
          <ThankYouBuy
            submissionId={submission.id}
            trainerProfileName={submission.trainers_details.profile_name}
            trainerProfileSlug={submission.trainers_details.profile_slug}
          />,
        ),
      });
    } catch (error) {
      return NextResponse.json(
        {
          message: `Creating submission error: ${error}`,
          ok: false,
        },
        { status: 400 },
      );
    }
  }

  return NextResponse.json({ result: event, ok: true });
}
