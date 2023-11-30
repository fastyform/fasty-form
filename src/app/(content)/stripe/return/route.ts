import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import getStripe from '@/app/(content)/stripe/_utils/get-stripe';
import getTrainerDetailsById from '@/app/(content)/trainers/[id]/_utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';
import { getSupabaseServerClient } from '@/utils/supabase/client';

export async function GET() {
  const stripe = getStripe();
  const supabase = getSupabaseServerClient();

  const user = await getUserFromSession();
  const trainerDetails = await getTrainerDetailsById(user.id);
  if (!trainerDetails.stripe_account_id) throw new Error();

  const stripeAccount = await stripe.accounts.retrieve(trainerDetails.stripe_account_id);
  const isOnboardedStripe = stripeAccount.charges_enabled;

  if (isOnboardedStripe) {
    await supabase.from('trainers_details').update({ is_onboarded_stripe: true }).eq('user_id', user.id);
  }

  revalidatePath('/settings/payments');

  return redirect(`/settings/payments${isOnboardedStripe ? '?isSuccess=true' : ''}`);
}
