import { z } from 'zod';
import { IntlShape } from '@/utils/types';

export type EditProfileValues = z.infer<ReturnType<typeof getEditProfileSchema>>;

export const getEditProfileSchema = (t: IntlShape) =>
  z.object({
    servicePrice: z.number().min(2).max(10000),
    profileName: z
      .string({ required_error: t('TRAINERS_EDIT_PROFILE_NAME_ERROR_EMPTY') })
      .min(1, t('TRAINERS_EDIT_PROFILE_NAME_ERROR_EMPTY'))
      .max(50, t('TRAINERS_EDIT_PROFILE_NAME_ERROR_MAX_LENGTH')),
  });
