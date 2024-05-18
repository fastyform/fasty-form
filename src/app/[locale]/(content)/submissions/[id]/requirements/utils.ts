import { z } from 'zod';
import { IntlShape } from '@/utils/types';

const MAX_CHAR = 5000;

export const submissionRequirementsSchema = (t: IntlShape) =>
  z.object({
    clientDescription: z.string().max(MAX_CHAR, t('ERROR_MAX_CHARACTERS', { max: MAX_CHAR })),
  });

export type SubmissionRequirements = z.infer<ReturnType<typeof submissionRequirementsSchema>>;
