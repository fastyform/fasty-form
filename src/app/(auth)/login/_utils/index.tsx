import { z } from 'zod';
import { emailValidator } from '@/utils/validators';

export type FormValues = z.infer<typeof formSchema>;

export const formSchema = z.object({
  email: emailValidator,
  password: z.string({ required_error: 'Proszę wprowadzić hasło.' }).min(1, 'Proszę wprowadzić hasło.'),
});
