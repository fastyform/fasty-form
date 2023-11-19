import { z } from 'zod';

const MIN_CHAR = 1;
const MAX_CHAR = 5000;

export type SupportFormValues = z.infer<typeof supportFormSchema>;

export const supportFormSchema = z.object({
  message: z
    .string({ required_error: 'Proszę wprowadzić tekst.' })
    .min(MIN_CHAR, 'Proszę wprowadzić tekst.')
    .max(MAX_CHAR, `Maksymalna ilość znaków to ${MAX_CHAR}`),
});
