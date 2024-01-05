import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const secret = process.env.STRIPE_ONBOARDING_WEBHOOK_SECRET!;

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

  if (event.type === 'account.updated' && event.account) {
    const { error } = await supabase
      .from('trainers_details')
      .update({ stripe_onboarding_status: 'verified' })
      .eq('stripe_account_id', event.account)
      .then();

    if (error)
      return NextResponse.json(
        {
          message: `Supabase Error: ${error.message}`,
          ok: false,
        },
        { status: 400 },
      );
  }

  return NextResponse.json({ result: event, ok: true });
}
