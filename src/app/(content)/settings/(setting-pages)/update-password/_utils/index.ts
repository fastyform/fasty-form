import { z } from 'zod';
import { passwordValidator } from '@/utils/validators';

export type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

export const updatePasswordSchema = z.object({
  password: passwordValidator,
});
