'use server';

import { onboardingFormSchema } from '@/app/(content)/onboarding/_components/onboarding-form/_utils';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionEditProfile = async (prevState: FormState, data: FormData) => {
  const formSchemaParsed = onboardingFormSchema.safeParse({
    servicePrice: parseInt(`${data.get('servicePrice')}`, 10),
    profileName: data.get('profileName'),
  });
  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient();
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return getResponse('Wystąpił błąd podczas zapisywania, spróbuj ponownie, lub skontaktuj się z nami.');
  }

  const userId = session.session.user.id;

  const { servicePrice, profileName } = formSchemaParsed.data;
  const { error } = await supabase
    .from('trainers_details')
    .update({ service_price: servicePrice, profile_name: profileName })
    .eq('user_id', userId);

  if (!error) {
    return getResponse('', true);
  }

  return getResponse('Wystąpił błąd podczas zapisywania, spróbuj ponownie, lub skontaktuj się z nami.');
};

export default actionEditProfile;
