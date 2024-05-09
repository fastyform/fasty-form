import { z } from 'zod';
import { IntlShape } from '@/utils/types';
import { emailValidator } from '@/utils/validators';

export const formSchema = (t: IntlShape) => z.object({ email: emailValidator(t) });
export type FormValues = z.infer<ReturnType<typeof formSchema>>;
