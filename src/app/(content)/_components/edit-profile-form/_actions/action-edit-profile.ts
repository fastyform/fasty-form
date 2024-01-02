'use server';

import dayjs from 'dayjs';
import { editProfileSchema } from '@/app/(content)/_components/edit-profile-form/_utils/edit-profile-form';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import StripeConstants from '@/app/(stripe)/stripe/_utils/stripe-constants';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';
import { getSupabaseServerClient } from '@/utils/supabase/client';

interface Payload {
  data: FormData;
  isDeleting: boolean;
}

const actionEditProfile = async (prevState: FormState, { data, isDeleting }: Payload) => {
  try {
    const stripe = getStripe();
    const formSchemaParsed = editProfileSchema.parse({
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
          .from('profile-images')
          .upload(`${user.id}.jpeg`, imageBlob, {
            contentType: 'Blob',
            upsert: true,
          });

        if (uploadImageError) throw new Error();
        const { data: publicProfileImageUrl } = supabase.storage.from('profile-images').getPublicUrl(`${user.id}.jpeg`);

        return `${publicProfileImageUrl.publicUrl}?timestamp=${Date.now()};`;
      }

      return undefined;
    };

    const imageUrl = await getImageUrl();
    const { servicePrice, profileName } = formSchemaParsed;

    if (trainerDetails.stripe_price_id) {
      await stripe.prices.update(trainerDetails.stripe_price_id, { active: false });
    }

    const price = await stripe.prices.create({
      currency: StripeConstants.CURRENCY,
      product: 'default_form_analysis',
      unit_amount: servicePrice * StripeConstants.GROSZ_MULTIPLIER,
      nickname: `${trainerDetails.profile_name} - ${user.id} - ${dayjs()}`,
    });

    const { error } = await supabase
      .from('trainers_details')
      .update({
        service_price_in_grosz: servicePrice * StripeConstants.GROSZ_MULTIPLIER,
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
