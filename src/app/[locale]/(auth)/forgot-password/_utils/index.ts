import { z } from 'zod';
import { IntlShape } from '@/utils/types';
import { emailValidator } from '@/utils/validators';

export type ForgotPasswordFormValues = z.infer<ReturnType<typeof forgotPasswordFormSchema>>;

export const forgotPasswordFormSchema = (t: IntlShape) =>
  z.object({
    email: emailValidator(t),
  });
