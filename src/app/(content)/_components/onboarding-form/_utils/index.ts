import { z } from 'zod';

const ALLOWED_SLUG_CHARS_REGEX = /^[a-z0-9\-_]+$/g;

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;

export const onboardingFormSchema = z.object({
  servicePrice: z.number().min(1).max(10000),
  profileName: z
    .string({ required_error: 'Wprowadź nazwę profilu.' })
    .min(1, 'Wprowadź nazwę profilu.')
    .max(50, 'Nazwa profilu może zawierać maksymalnie 50 znaków.'),
  profileSlug: z
    .string({ required_error: 'Wprowadź link do profilu.' })
    .regex(ALLOWED_SLUG_CHARS_REGEX, 'Link może zawierać wyłącznie małe litery, cyfry, łączniki (-) i podkreślenia (_)')
    .min(1, 'Wprowadź link do profilu.')
    .max(50, 'Link do profilu może zawierać maksymalnie 50 znaków.'),
});
