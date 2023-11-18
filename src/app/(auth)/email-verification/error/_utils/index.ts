import { z } from 'zod';
import { emailValidator } from '@/utils/validators';

export const formSchema = z.object({ email: emailValidator });
export type FormValues = z.infer<typeof formSchema>;
