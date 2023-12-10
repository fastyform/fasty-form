import { z } from 'zod';

const MIN_CHAR = 1;
const MAX_CHAR = 5000;

export const submissionRequirementsSchema = z.object({
  client_description: z
    .string()
    .min(MIN_CHAR, 'Pole nie może być puste')
    .max(MAX_CHAR, `Maksymalna ilość znaków to ${MAX_CHAR}`),
});

export type SubmissionRequirementsSchema = z.infer<typeof submissionRequirementsSchema>;
