import { z } from 'zod';
import { IntlShape } from '@/utils/types';

const ALLOWED_SLUG_CHARS_REGEX = /^[a-z0-9\-_]+$/g;

export const onboardingFormSchema = (t: IntlShape) =>
  z.object({
    servicePrice: z.number().min(2).max(10000),
    profileName: z
      .string()
      .min(1, t('COMMON_PROFILE_NAME_ERROR_EMPTY'))
      .max(50, t('COMMON_PROFILE_NAME_ERROR_MAX_LENGTH')),
    profileSlug: z
      .string()
      .regex(ALLOWED_SLUG_CHARS_REGEX, t('ONBOARDING_ERROR_LINK_INCORRECT'))
      .min(1, t('ONBOARDING_ERROR_LINK_EMPTY'))
      .max(50, t('ONBOARDING_ERROR_LINK_MAX_LENGTH')),
    marketingConsent: z.boolean(),
  });

export type OnboardingFormValues = z.infer<ReturnType<typeof onboardingFormSchema>>;
