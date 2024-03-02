'use server';

import { revalidatePath } from 'next/cache';
import getUserFromSession from '@/utils/get-user-from-session';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionUpdateMarketingConsent = async (marketing_consent: boolean) => {
  const supabase = getSupabaseServerClient();

  const user = await getUserFromSession();

  const { error } = await supabase
    .from('roles')
    .update({ marketing_consent, consent_modal_displayed: true })
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/', 'layout');
};

export default actionUpdateMarketingConsent;
