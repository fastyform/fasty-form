import { z } from 'zod';

import { IntlShape } from '@/utils/types';
import { bioValidator, profileNameValidator } from '@/utils/validators';

export const editPriceFormSchema = z.object({
  servicePrice: z.number().min(2).max(10000),
});

export const getProfileNameFormSchema = (t: IntlShape) => z.object({ profileName: profileNameValidator(t) });

export const getProfileBioFormSchema = (t: IntlShape) => z.object({ bio: bioValidator(t) });

export const SOCIAL_LINKS = ['instagram', 'facebook', 'youtube', 'tiktok'] as const;

export type SocialLink = (typeof SOCIAL_LINKS)[number];

const socialLinkValidator = (socialType: SocialLink, t: IntlShape) =>
  z.union([
    z.literal(''),
    z
      .string()
      .url({ message: t(`TRAINERS_EDIT_PROFILE_SOCIAL_LINKS_ERROR_${socialType}`) })
      .refine((url) => url.includes(`${socialType}.com`), {
        message: t(`TRAINERS_EDIT_PROFILE_SOCIAL_LINKS_ERROR_${socialType}`),
      }),
  ]);

export const getSocialLinksSchema = (t: IntlShape) =>
  z.object({
    ...(Object.fromEntries(
      SOCIAL_LINKS.map((socialType) => [socialType, socialLinkValidator(socialType, t)] as const),
    ) as Record<SocialLink, ReturnType<typeof socialLinkValidator>>),
  });

export type SocialLinks = z.infer<ReturnType<typeof getSocialLinksSchema>>;
