import { z } from 'zod';
import { checkboxCheckedValidator, emailValidator, passwordValidator } from '@/utils/validators';

export const formSchema = z.object({
  service_cost: z.number().min(1).max(10000),
  profile_name: z
    .string()
    .min(1, 'Wprowadź nazwę profilu.')
    .max(50, 'Nazwa profilu może zawierać maksymalnie 50 znaków.'),
  email: emailValidator,
  password: passwordValidator,
  policy: checkboxCheckedValidator,
});

export type FormValues = z.infer<typeof formSchema>;
