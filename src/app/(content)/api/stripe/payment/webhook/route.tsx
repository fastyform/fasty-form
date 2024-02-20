import { render } from '@react-email/render';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import MailTemplate from '@/utils/mail/mail-template';
import { sendMail } from '@/utils/mail/send-mail';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import SuccessfulPaymentMailContent from './_components/successful-payment-mail-content';

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

      const { data: submission, error } = await supabase
        .from('submissions')
        .insert({
          stripe_session_id: session.id,
          client_id: session.metadata.userId,
          trainer_id: session.metadata.trainerId,
          status: 'paid',
          id: session.metadata.submissionId,
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

      sendMail({
        to: session.metadata.userEmail,
        subject: 'Dziękujemy za zakup!',
        html: render(
          <MailTemplate title="Dzięki za zakup analizy! Jesteśmy gotowi na Twoje wideo.">
            <SuccessfulPaymentMailContent
              submissionId={submission.id}
              trainerProfileName={submission.trainers_details.profile_name}
              trainerProfileSlug={submission.trainers_details.profile_slug}
            />
          </MailTemplate>,
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

  if (event.type === 'charge.succeeded') {
    const charge = event.data.object;

    try {
      const balance = await stripe.balanceTransactions.retrieve(event.data.object.balance_transaction as string, {
        stripeAccount: event.account,
      });

      if (!charge.metadata.submissionId) {
        throw new Error('Metadata is empty');
      }

      const { error } = await supabase
        .from('submissions')
        .update({ price_in_grosz: balance.net })
        .eq('id', charge.metadata.submissionId);

      if (error) {
        throw new Error(error.message);
      }
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
