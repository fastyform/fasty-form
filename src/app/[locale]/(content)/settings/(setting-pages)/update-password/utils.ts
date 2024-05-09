import { z } from 'zod';
import { IntlShape } from '@/utils/types';
import { newPasswordValidator } from '@/utils/validators';

export type UpdatePasswordFormValues = z.infer<ReturnType<typeof updatePasswordSchema>>;

export const updatePasswordSchema = (t: IntlShape) => z.object({ password: newPasswordValidator(t) });
