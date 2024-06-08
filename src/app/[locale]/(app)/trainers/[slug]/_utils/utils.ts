import { z } from 'zod';

import { IntlShape } from '@/utils/types';

export const editPriceFormSchema = z.object({
  servicePrice: z.number().min(2).max(10000),
});

export const getProfileNameFormSchema = (t: IntlShape) =>
  z.object({
    profileName: z
      .string({ required_error: t('COMMON_PROFILE_NAME_ERROR_EMPTY') })
      .min(1, t('COMMON_PROFILE_NAME_ERROR_EMPTY'))
      .max(50, t('COMMON_PROFILE_NAME_ERROR_MAX_LENGTH')),
  });

const MAX_BIO_CHAR = 200;
export const getProfileBioFormSchema = (t: IntlShape) =>
  z.object({
    bio: z.string().max(MAX_BIO_CHAR, t('ERROR_MAX_CHARACTERS', { max: MAX_BIO_CHAR })),
  });

const socialLinks = ['instagram', 'facebook', 'youtube', 'tiktok'] as const;

export type SocialLink = (typeof socialLinks)[number];

const socialLinkValidator = (socialType: SocialLink, t: IntlShape) =>
  z
    .string()
    .url({ message: t(`TRAINERS_EDIT_PROFILE_SOCIAL_LINKS_ERROR_${socialType}`) })
    .refine((url) => url.includes(`${socialType}.com`) || url === '', {
      message: t(`TRAINERS_EDIT_PROFILE_SOCIAL_LINKS_ERROR_${socialType}`),
    });

export const getSocialLinksSchema = (t: IntlShape) =>
  z.object({
    ...(Object.fromEntries(
      socialLinks.map((socialType) => [socialType, socialLinkValidator(socialType, t)] as const),
    ) as Record<SocialLink, ReturnType<typeof socialLinkValidator>>),
  });

export type SocialLinks = z.infer<ReturnType<typeof getSocialLinksSchema>>;
