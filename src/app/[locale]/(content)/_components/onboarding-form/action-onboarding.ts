'use server';

import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';
import { PLNToGrosz } from '@/utils/stripe';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { onboardingFormSchema } from './utils';

const actionOnboarding = async (prevState: FormState, data: FormData) => {
  const t = await getTranslations();
  const formSchemaParsed = onboardingFormSchema(t).safeParse({
    servicePrice: parseInt(`${data.get('servicePrice')}`, 10),
    profileName: data.get('profileName'),
    profileSlug: data.get('profileSlug'),
    marketingConsent: data.get('marketingConsent') === 'true',
  });
  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return getResponse(t('COMMON_ERROR'));
  }

  const userId = userData.user.id;

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

  if (error && error.code === '23505') return getResponse(t('ONBOARDING_ERROR_LINK_EXISTS'));

  return getResponse(t('COMMON_ERROR'));
};

export default actionOnboarding;
