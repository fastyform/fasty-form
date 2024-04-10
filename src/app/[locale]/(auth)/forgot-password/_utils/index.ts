import { z } from 'zod';
import { emailValidator } from '@/utils/validators';

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

export const forgotPasswordFormSchema = z.object({
  email: emailValidator,
});
