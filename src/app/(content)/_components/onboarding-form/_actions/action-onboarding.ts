'use server';

import { redirect } from 'next/navigation';
import { trainerDetailsSchema } from '@/app/(content)/_utils/trainer-details-form';
import { getResponse } from '@/utils';
import Constants from '@/utils/constants';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionOnBoarding = async (prevState: FormState, data: FormData) => {
  const formSchemaParsed = trainerDetailsSchema.safeParse({
    servicePrice: parseInt(`${data.get('servicePrice')}`, 10),
    profileName: data.get('profileName'),
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

  const { servicePrice, profileName } = formSchemaParsed.data;
  const { error } = await supabase
    .from('trainers_details')
    .update({ service_price: servicePrice, profile_name: profileName, is_onboarded: true })
    .eq('user_id', userId);

  if (!error) {
    return redirect(`/trainers/${userId}`);
  }

  return getResponse(Constants.COMMON_ERROR_MESSAGE);
};

export default actionOnBoarding;
