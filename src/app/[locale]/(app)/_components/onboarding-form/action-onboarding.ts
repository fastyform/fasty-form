'use server';

import dayjs from 'dayjs';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { PLNToGrosz } from '@/utils/stripe';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { onboardingFormSchema, OnboardingFormValues } from './utils';

const actionOnboarding = async (data: OnboardingFormValues) => {
  const t = await getTranslations();

  const formSchemaParsed = onboardingFormSchema(t).safeParse(data);

  if (!formSchemaParsed.success) {
    return { isSuccess: false, messageKey: 'COMMON_ERROR' } as const;
  }

  const supabase = getSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { isSuccess: false, messageKey: 'ONBOARDING_ERROR_LINK_EXISTS' } as const;
  }

  const userId = userData.user.id;

  const { servicePrice, profileName, profileSlug, marketingConsent, bio } = formSchemaParsed.data;
  const { error } = await supabase
    .from('trainers_details')
    .update({
      service_price_in_grosz: PLNToGrosz(servicePrice),
      profile_name: profileName,
      profile_slug: profileSlug,
      is_onboarded: true,
      bio,
      onboarded_at: dayjs().toISOString(),
    })
    .eq('user_id', userId);

  await supabase.from('user_data').update({ marketing_consent: marketingConsent }).eq('user_id', userId);

  if (!error) {
    return redirect(`/trainers/${profileSlug}`);
  }

  if (error && error.code === '23505') {
    return { isSuccess: false, messageKey: 'ONBOARDING_ERROR_LINK_EXISTS' } as const;
  }

  return { isSuccess: false, messageKey: 'COMMON_ERROR' } as const;
};

export default actionOnboarding;
