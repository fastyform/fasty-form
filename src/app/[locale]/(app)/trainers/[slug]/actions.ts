'use server';

import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import getLoggedInUser from '@/utils/get-logged-in-user';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import { PLNToGrosz, StripeConstants } from '@/utils/stripe';
import getStripe from '@/utils/stripe/get-stripe';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import {
  editPriceFormSchema,
  getProfileBioFormSchema,
  getProfileNameFormSchema,
  getSocialLinksSchema,
  SocialLinks,
} from './_utils/utils';

interface EditProfilePayload {
  profileName: string;
  trainerProfileSlug: string;
}

export const actionEditProfileName = async ({ profileName, trainerProfileSlug }: EditProfilePayload) => {
  const t = await getTranslations();
  getProfileNameFormSchema(t).parse({ profileName });
  const supabase = getSupabaseServerClient();
  const user = await getLoggedInUser();

  const { error } = await supabase
    .from('trainers_details')
    .update({
      profile_name: profileName,
    })
    .eq('user_id', user.id);

  if (error) throw new Error();

  revalidatePath(`/trainers/${trainerProfileSlug}`);
};

interface EditPricePayload {
  servicePrice: number;
  trainerProfileSlug: string;
}

export const actionEditPrice = async ({ servicePrice, trainerProfileSlug }: EditPricePayload) => {
  editPriceFormSchema.parse({ servicePrice });
  const stripe = getStripe();
  const supabase = getSupabaseServerClient();
  const user = await getLoggedInUser();
  const trainerDetails = await getTrainerDetailsById(user.id);

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
    .update({ service_price_in_grosz: PLNToGrosz(servicePrice), stripe_price_id: price?.id })
    .eq('user_id', user.id);

  if (error) throw new Error();

  revalidatePath(`/trainers/${trainerProfileSlug}`);
};

interface EditBioPayload {
  bio: string;
  trainerProfileSlug: string;
}

export const actionEditBio = async ({ bio, trainerProfileSlug }: EditBioPayload) => {
  const t = await getTranslations();
  getProfileBioFormSchema(t).parse({ bio });
  const supabase = getSupabaseServerClient();
  const user = await getLoggedInUser();

  const { error } = await supabase.from('trainers_details').update({ bio }).eq('user_id', user.id);

  if (error) throw new Error();

  revalidatePath(`/trainers/${trainerProfileSlug}`);
};

interface EditProfilePicturePayload {
  imageBlobData: FormData | null;
  isDeleting: boolean;
  trainerProfileSlug: string;
}

// TODO: Check if isDeleting is still needed
export const actionEditProfilePicture = async ({
  imageBlobData,
  isDeleting,
  trainerProfileSlug,
}: EditProfilePicturePayload) => {
  const imageBlob = imageBlobData?.get('image');
  const supabase = getSupabaseServerClient();
  const user = await getLoggedInUser();

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

  const { error } = await supabase
    .from('trainers_details')
    .update({
      ...(imageUrl !== undefined && { profile_image_url: imageUrl }),
    })
    .eq('user_id', user.id);

  if (error) throw new Error();

  revalidatePath(`/trainers/${trainerProfileSlug}`);
};

interface EditSocialLinksPayload {
  socialLinks: SocialLinks;
  trainerProfileSlug: string;
}

export const actionEditSocialLinks = async ({ socialLinks, trainerProfileSlug }: EditSocialLinksPayload) => {
  const t = await getTranslations();
  getSocialLinksSchema(t).parse(socialLinks);
  const supabase = getSupabaseServerClient();
  const user = await getLoggedInUser();

  const { error } = await supabase
    .from('trainers_details')
    .update({ social_links: socialLinks })
    .eq('user_id', user.id);

  if (error) throw new Error();

  revalidatePath(`/trainers/${trainerProfileSlug}`);
};
