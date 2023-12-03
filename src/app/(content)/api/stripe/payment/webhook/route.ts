import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const secret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const stripe = getStripe();
  const signature = headers().get('stripe-signature');
  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);

  if (!signature) throw new Error('Test');

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
      if (!session.metadata || !session.metadata.userId || !session.metadata.trainerId)
        throw new Error('Metadata is empty');

      const { error } = await supabase.from('submissions').insert({
        order_id: session.id,
        client_id: session.metadata.userId,
        trainer_id: session.metadata.trainerId,
        status: 'paid',
      });

      if (error) throw new Error(error.message);
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
