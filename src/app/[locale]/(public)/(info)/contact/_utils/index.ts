import { z } from 'zod';
import { IntlShape } from '@/utils/types';
import { emailValidator } from '@/utils/validators';

const MIN_CHAR = 1;
const MAX_CHAR = 5000;

export type ContactFormValues = z.infer<ReturnType<typeof contactFormSchema>>;

export const contactFormSchema = (t: IntlShape) =>
  z.object({
    email: emailValidator(t),
    message: z
      .string({ required_error: t('COMMON_REQUIRED_FIELD') })
      .min(MIN_CHAR, t('COMMON_REQUIRED_FIELD'))
      .max(MAX_CHAR, t('ERROR_MAX_CHARACTERS', { max: MAX_CHAR })),
  });
