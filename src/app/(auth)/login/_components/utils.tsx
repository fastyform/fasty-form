import { z } from 'zod';

export type FormValues = z.infer<typeof formSchema>;

export const formSchema = z.object({
  email: z
    .string({
      required_error: 'Proszę wprowadzić email.',
    })
    .email({ message: 'Proszę wprowadzić poprawny adres email.' }),
  password: z.string({ required_error: 'Proszę wprowadzić hasło.' }).min(1, 'Proszę wprowadzić hasło.'),
});
