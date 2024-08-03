import { z } from 'zod';
import { IntlShape } from '@/utils/types';

const MIN_CHAR = 1;
const MAX_CHAR = 500;

export const requestNewVideoSchema = (t: IntlShape) =>
  z.object({
    trainerReview: z
      .string()
      .min(MIN_CHAR, t('COMMON_REQUIRED_FIELD'))
      .max(MAX_CHAR, t('ERROR_MAX_CHARACTERS', { max: MAX_CHAR })),
  });

export type RequestNewVideoValues = z.infer<ReturnType<typeof requestNewVideoSchema>>;
