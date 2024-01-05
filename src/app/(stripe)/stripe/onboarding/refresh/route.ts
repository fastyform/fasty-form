import { redirect } from 'next/navigation';
import actionPaymentOnboardingRedirect from '@/app/(content)/settings/(setting-pages)/payments/_actions/action-payment-onboarding-redirect';

export async function GET() {
  const response = await actionPaymentOnboardingRedirect();
  if (response.message) {
    return redirect('/settings/payments');
  }
}

export const revalidate = 0;
