import { z } from 'zod';
import { IntlShape } from '@/utils/types';

const MIN_CHAR = 1;
const MAX_CHAR = 5000;

export const trainerReviewFormSchema = (t: IntlShape) =>
  z.object({
    trainerReview: z
      .string()
      .min(MIN_CHAR, t('COMMON_REQUIRED_FIELD'))
      .max(MAX_CHAR, t('ERROR_MAX_CHARACTERS', { max: MAX_CHAR })),
  });

export type TrainerReviewValues = z.infer<ReturnType<typeof trainerReviewFormSchema>>;
