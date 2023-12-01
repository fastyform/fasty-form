'use server';

import dayjs from 'dayjs';
import { trainerDetailsSchema } from '@/app/(content)/_utils/trainer-details-form';
import getStripe from '@/app/(content)/stripe/_utils/get-stripe';
import getTrainerDetailsById from '@/app/(content)/trainers/[id]/_utils/get-trainer-details-by-id';
import { getResponse } from '@/utils';
import Constants from '@/utils/constants';
import { FormState } from '@/utils/form';
import getUserFromSession from '@/utils/get-user-from-session';
import { getSupabaseServerClient } from '@/utils/supabase/client';

interface Payload {
  data: FormData;
  isDeleting: boolean;
}

const actionEditProfile = async (prevState: FormState, { data, isDeleting }: Payload) => {
  try {
    const stripe = getStripe();
    const formSchemaParsed = trainerDetailsSchema.parse({
      servicePrice: parseInt(`${data.get('servicePrice')}`, 10),
      profileName: data.get('profileName'),
    });
    const imageBlob = data.get('imageBlob');

    const supabase = getSupabaseServerClient();
    const user = await getUserFromSession();
    const trainerDetails = await getTrainerDetailsById(user.id);

    const getImageUrl = async () => {
      if (isDeleting) {
        return null;
      }

      if (imageBlob) {
        const { error: uploadImageError } = await supabase.storage
          .from('profile_images')
          .upload(`${user.id}.jpeg`, imageBlob, {
            contentType: 'Blob',
            upsert: true,
          });

        if (uploadImageError) throw new Error();

        const { data: publicProfileImageUrl } = supabase.storage.from('profile_images').getPublicUrl(`${user.id}.jpeg`);

        return `${publicProfileImageUrl.publicUrl}?timestamp=${Date.now()};`;
      }

      return undefined;
    };

    const imageUrl = await getImageUrl();
    const { servicePrice, profileName } = formSchemaParsed;

    const price = await stripe.prices.create({
      currency: Constants.CURRENCY as const,
      product: 'default_form_analysis',
      unit_amount: servicePrice * Constants.GROSZ_MULTIPLIER,
      nickname: `${trainerDetails.profile_name} - ${user.id} - ${dayjs()}`,
    });

    const { error } = await supabase
      .from('trainers_details')
      .update({
        service_price: servicePrice,
        profile_name: profileName,
        stripe_price_id: price.id,
        ...(imageUrl !== undefined && { profile_image_url: imageUrl }),
      })
      .eq('user_id', user.id);

    if (error) throw new Error();

    return getResponse('', true);
  } catch {
    return getResponse('Coś poszło nie tak podczas zapisywania profilu. Spróbuj ponownie lub skontaktuj się z nami.');
  }
};

export default actionEditProfile;
