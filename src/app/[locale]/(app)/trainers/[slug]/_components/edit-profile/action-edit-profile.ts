'use server';

import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';
import getLoggedInUser from '@/utils/get-logged-in-user';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import { PLNToGrosz, StripeConstants } from '@/utils/stripe';
import getStripe from '@/utils/stripe/get-stripe';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { EditProfileValues } from './_utils/edit-profile';

interface Payload {
  data: EditProfileValues & { imageBlob: FormData | null };
  isDeleting: boolean;
  trainerProfileSlug: string;
}

const actionEditProfile = async ({ data, isDeleting, trainerProfileSlug }: Payload) => {
  const imageBlob = data.imageBlob?.get('image');
  const stripe = getStripe();
  const supabase = getSupabaseServerClient();
  const user = await getLoggedInUser();
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
  const { servicePrice, profileName } = data;
  let price;

  if (trainerDetails.stripe_price_id && trainerDetails.stripe_account_id) {
    price = await stripe.prices.create(
      {
        currency: StripeConstants.CURRENCY,
        product: user.id,
        unit_amount: PLNToGrosz(servicePrice),
        nickname: `${trainerDetails.profile_name} - ${user.id} - ${dayjs()}`,
      },
      { stripeAccount: trainerDetails.stripe_account_id },
    );
  }

  const { error } = await supabase
    .from('trainers_details')
    .update({
      service_price_in_grosz: PLNToGrosz(servicePrice),
      profile_name: profileName,
      stripe_price_id: price?.id,
      ...(imageUrl !== undefined && { profile_image_url: imageUrl }),
    })
    .eq('user_id', user.id);

  if (error) throw new Error();

  revalidatePath(`/trainers/${trainerProfileSlug}`);
};

export default actionEditProfile;
