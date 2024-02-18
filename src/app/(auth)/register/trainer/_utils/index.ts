import { z } from 'zod';
import { emailValidator, newPasswordValidator } from '@/utils/validators';

export const formSchema = z.object({
  email: emailValidator,
  password: newPasswordValidator,
});

export type FormValues = z.infer<typeof formSchema>;
