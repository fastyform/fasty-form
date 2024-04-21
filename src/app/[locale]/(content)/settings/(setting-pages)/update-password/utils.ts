import { z } from 'zod';
import { newPasswordValidator } from '@/utils/validators';

export type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

export const updatePasswordSchema = z.object({ password: newPasswordValidator });
