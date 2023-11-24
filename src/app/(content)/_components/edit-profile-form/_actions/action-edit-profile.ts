'use server';

import { trainerDetailsSchema } from '@/app/(content)/_utils/trainer-details-form';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';
import { getSupabaseServerClient } from '@/utils/supabase/client';

interface Payload {
  data: FormData;
  isDeleting: boolean;
}

const actionEditProfile = async (prevState: FormState, { data, isDeleting }: Payload) => {
  try {
    const formSchemaParsed = trainerDetailsSchema.parse({
      servicePrice: parseInt(`${data.get('servicePrice')}`, 10),
      profileName: data.get('profileName'),
    });
    const imageBlob = data.get('imageBlob');

    const supabase = getSupabaseServerClient();

    const { data: session } = await supabase.auth.getSession();
    if (!session.session) throw new Error();

    const userId = session.session.user.id;

    const getImageUrl = async () => {
      if (isDeleting) {
        return null;
      }

      if (imageBlob) {
        const { error: uploadImageError } = await supabase.storage
          .from('profile_images')
          .upload(`${userId}.jpeg`, imageBlob, {
            contentType: 'Blob',
            upsert: true,
          });

        if (uploadImageError) throw new Error();

        const { data: publicProfileImageUrl } = supabase.storage.from('profile_images').getPublicUrl(`${userId}.jpeg`);

        return `${publicProfileImageUrl.publicUrl}?timestamp=${Date.now()};`;
      }

      return undefined;
    };

    const imageUrl = await getImageUrl();
    const { servicePrice, profileName } = formSchemaParsed;

    const { error } = await supabase
      .from('trainers_details')
      .update({
        service_price: servicePrice,
        profile_name: profileName,
        ...(imageUrl !== undefined && { profile_image_url: imageUrl }),
      })
      .eq('user_id', userId);

    if (error) throw new Error();

    return getResponse('', true);
  } catch {
    return getResponse('Coś poszło nie tak podczas zapisywania profilu. Spróbuj ponownie lub skontaktuj się z nami.');
  }
};

export default actionEditProfile;
