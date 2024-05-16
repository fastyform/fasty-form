'use server';

import { revalidatePath } from 'next/cache';
import getLoggedInUser from '@/utils/get-logged-in-user';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionUpdateMarketingConsent = async (marketing_consent: boolean) => {
  const supabase = getSupabaseServerClient();

  const user = await getLoggedInUser();

  const { error } = await supabase
    .from('user_data')
    .update({ marketing_consent, consent_modal_displayed: true })
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/', 'layout');
};

export default actionUpdateMarketingConsent;
