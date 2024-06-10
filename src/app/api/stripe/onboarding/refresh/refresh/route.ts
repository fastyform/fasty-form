import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import actionPaymentOnboardingRedirect from '@/app/[locale]/(app)/(content)/payments/@unverified/action-payment-onboarding-redirect';
import { stripeOnboardingSchema } from '@/app/[locale]/(app)/(content)/payments/utils';

export async function GET(request: Request) {
  try {
    const t = await getTranslations();
    const { searchParams } = new URL(request.url);

    const payloadString = searchParams.get('payload');

    if (!payloadString) throw new Error('Payload is missing');

    const decodedPayload = decodeURIComponent(payloadString);
    const payload = JSON.parse(decodedPayload);

    const parsedPayload = stripeOnboardingSchema(t).parse(payload);

    await actionPaymentOnboardingRedirect(parsedPayload);
  } catch {
    return redirect('/payments');
  }
}

export const revalidate = 0;
