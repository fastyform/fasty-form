import { z } from 'zod';

const MIN_CHAR = 1;
const MAX_CHAR = 5000;

export type TrainerReviewValues = z.infer<typeof trainerReviewFormSchema>;

export const trainerReviewFormSchema = z.object({
  trainerReview: z
    .string({ required_error: 'Proszę wprowadzić tekst.' })
    .min(MIN_CHAR, 'Proszę wprowadzić tekst.')
    .max(MAX_CHAR, `Maksymalna ilość znaków to ${MAX_CHAR}`),
});
