'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { editProfileFormSchema } from '@/app/(content)/_components/edit-profile-form/_utils';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionEditProfile = async (prevState: FormState, data: FormData) => {
  const formSchemaParsed = editProfileFormSchema.safeParse({
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
    .update({ service_price: servicePrice, profile_name: profileName, is_onboarded: true })
    .eq('user_id', userId);

  if (!error) {
    revalidatePath(`/trainers/${userId}`);

    return redirect(`/trainers/${userId}`);
  }

  return getResponse('Wystąpił błąd podczas zapisywania, spróbuj ponownie, lub skontaktuj się z nami.');
};

export default actionEditProfile;
