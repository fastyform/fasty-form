import { redirect } from 'next/navigation';
import actionPaymentOnboardingRedirect from '@/app/(content)/settings/(setting-pages)/payments/_actions/action-payment-onboarding-redirect';
import { stripeOnboardingSchema } from '@/app/(content)/settings/(setting-pages)/payments/utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const payloadString = searchParams.get('payload');

    if (!payloadString) throw new Error('Payload is missing');

    const decodedPayload = decodeURIComponent(payloadString);
    const payload = JSON.parse(decodedPayload);

    const parsedPayload = stripeOnboardingSchema.parse(payload);

    await actionPaymentOnboardingRedirect(parsedPayload);
  } catch {
    return redirect('/settings/payments');
  }
}

export const revalidate = 0;
