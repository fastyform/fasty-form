'use server';

import { redirect } from 'next/navigation';
import { onboardingFormSchema } from '@/app/(content)/_components/onboarding-form/_utils';
import { PLNToGrosz } from '@/app/(stripe)/stripe/_utils';
import { getResponse } from '@/utils';
import Constants from '@/utils/constants';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionOnBoarding = async (prevState: FormState, data: FormData) => {
  const formSchemaParsed = onboardingFormSchema.safeParse({
    servicePrice: parseInt(`${data.get('servicePrice')}`, 10),
    profileName: data.get('profileName'),
    profileSlug: data.get('profileSlug'),
    marketingConsent: data.get('marketingConsent') === 'true',
  });
  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient();
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return getResponse(Constants.COMMON_ERROR_MESSAGE);
  }

  const userId = session.session.user.id;

  const { servicePrice, profileName, profileSlug, marketingConsent } = formSchemaParsed.data;
  const { error } = await supabase
    .from('trainers_details')
    .update({
      service_price_in_grosz: PLNToGrosz(servicePrice),
      profile_name: profileName,
      profile_slug: profileSlug,
      is_onboarded: true,
      onboarded_at: new Date().toISOString(),
    })
    .eq('user_id', userId);

  const { error: errorMarketingConsent } = await supabase
    .from('roles')
    .update({ marketing_consent: marketingConsent })
    .eq('user_id', userId);

  if (!error && !errorMarketingConsent) {
    return redirect(`/trainers/${profileSlug}`);
  }

  if (error && error.code === '23505') return getResponse('Twój link do profilu nie jest unikalny. Spróbuj inny.');

  return getResponse(Constants.COMMON_ERROR_MESSAGE);
};

export default actionOnBoarding;
