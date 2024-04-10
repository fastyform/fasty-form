import { z } from 'zod';
import { emailValidator, passwordValidator } from '@/utils/validators';

export type FormValues = z.infer<typeof formSchema>;

export const formSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});
