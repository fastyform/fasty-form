import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import StripeConstants from '@/app/(stripe)/stripe/_utils/stripe-constants';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';
import { getSupabaseServerClient } from '@/utils/supabase/client';

export async function GET() {
  let isOnboardedStripe: boolean;
  let isRequiredDataFilled: boolean;
  let isError: boolean;
  const supabase = getSupabaseServerClient();

  const user = await getUserFromSession();
  const trainerDetails = await getTrainerDetailsById(user.id);
  if (!trainerDetails.stripe_account_id || !trainerDetails.service_price_in_grosz) throw new Error();

  try {
    const stripe = getStripe();
    const stripeAccount = await stripe.accounts.retrieve(trainerDetails.stripe_account_id);

    isRequiredDataFilled = stripeAccount.requirements?.currently_due?.length === 0;
    isOnboardedStripe = stripeAccount.charges_enabled || trainerDetails.stripe_onboarding_status === 'verified';

    if (isOnboardedStripe || isRequiredDataFilled) {
      const price = await stripe.prices.create({
        currency: StripeConstants.CURRENCY,
        product: 'default_form_analysis',
        unit_amount: trainerDetails.service_price_in_grosz,
        nickname: `${trainerDetails.profile_name} - ${user.id} - ${dayjs()}`,
      });

      const { error } = await supabase
        .from('trainers_details')
        .update({
          stripe_onboarding_status: isOnboardedStripe ? 'verified' : 'pending_verification',
          stripe_price_id: price.id,
        })
        .eq('user_id', user.id);

      if (error) throw new Error();
    }
  } catch {
    isError = true;
  }

  revalidatePath('/settings/payments');

  const getRedirectParam = () => {
    if (isOnboardedStripe) return '?stripe_onboarding_status=verified';
    if (isRequiredDataFilled) return '?stripe_onboarding_status=pending_verification';
    if (isError) return '?stripe_onboarding_status=error';

    return '';
  };

  return redirect(`/settings/payments${getRedirectParam()}`);
}
