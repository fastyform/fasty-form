import { z } from 'zod';
import { checkboxCheckedValidator, emailValidator, passwordValidator } from '@/utils/validators';

export const formSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
  policy: checkboxCheckedValidator,
});

export type FormValues = z.infer<typeof formSchema>;
