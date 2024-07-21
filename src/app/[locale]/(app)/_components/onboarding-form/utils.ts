import { z } from 'zod';
import { getSocialLinksSchema } from '@/app/[locale]/(app)/trainers/[slug]/_utils/utils';
import { IntlShape } from '@/utils/types';
import { bioValidator, profileNameValidator } from '@/utils/validators';

const ALLOWED_SLUG_CHARS_REGEX = /^[a-z0-9\-_]+$/g;

export const onboardingFormSchema = (t: IntlShape) =>
  z.object({
    servicePrice: z.number().min(2).max(10000),
    profileName: profileNameValidator(t),
    bio: bioValidator(t),
    profileSlug: z
      .string()
      .regex(ALLOWED_SLUG_CHARS_REGEX, t('ONBOARDING_ERROR_LINK_INCORRECT'))
      .min(1, t('ONBOARDING_ERROR_LINK_EMPTY'))
      .max(50, t('ONBOARDING_ERROR_LINK_MAX_LENGTH')),
    socialLinks: getSocialLinksSchema(t),
    marketingConsent: z.boolean(),
  });

export type OnboardingFormValues = z.infer<ReturnType<typeof onboardingFormSchema>>;
