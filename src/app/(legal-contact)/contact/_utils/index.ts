import { z } from 'zod';
import { emailValidator } from '@/utils/validators';

const MIN_CHAR = 1;
const MAX_CHAR = 5000;

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormSchema = z.object({
  email: emailValidator,
  message: z
    .string({ required_error: 'Proszę wprowadzić tekst.' })
    .min(MIN_CHAR, 'Proszę wprowadzić tekst.')
    .max(MAX_CHAR, `Maksymalna ilość znaków to ${MAX_CHAR}`),
});
