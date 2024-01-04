import { z } from 'zod';
import { checkboxCheckedValidator, emailValidator, newPasswordValidator } from '@/utils/validators';

export const formSchema = z.object({
  email: emailValidator,
  password: newPasswordValidator,
  policy: checkboxCheckedValidator,
});

export type FormValues = z.infer<typeof formSchema>;
