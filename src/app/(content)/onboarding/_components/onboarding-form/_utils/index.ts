import { z } from 'zod';

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;

export const onboardingFormSchema = z.object({
  servicePrice: z.number().min(1).max(10000),
  profileName: z
    .string()
    .min(1, 'Wprowadź nazwę profilu.')
    .max(50, 'Nazwa profilu może zawierać maksymalnie 50 znaków.'),
});
