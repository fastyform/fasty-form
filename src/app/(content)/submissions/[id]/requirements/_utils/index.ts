import { z } from 'zod';

const MAX_CHAR = 5000;

export const submissionRequirementsSchema = z.object({
  clientDescription: z.string().max(MAX_CHAR, `Maksymalna ilość znaków to ${MAX_CHAR}`),
});

export type SubmissionRequirements = z.infer<typeof submissionRequirementsSchema>;
