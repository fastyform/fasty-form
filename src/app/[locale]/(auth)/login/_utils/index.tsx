import { z } from 'zod';
import { IntlShape } from '@/utils/types';
import { emailValidator, passwordValidator } from '@/utils/validators';

export type FormValues = z.infer<ReturnType<typeof formSchema>>;

export const formSchema = (t: IntlShape) =>
  z.object({
    email: emailValidator(t),
    password: passwordValidator(t),
  });
