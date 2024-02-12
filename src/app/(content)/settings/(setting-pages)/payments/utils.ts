import { z } from 'zod';

export const stripeOnboardingSchema = z
  .object({
    businessType: z.enum(['individual', 'company']),
    firstName: z.string(),
    lastName: z.string(),
    nip: z.string(),
  })
  .refine((data) => data.businessType !== 'individual' || data.firstName.length > 1, {
    path: ['firstName'],
    message: 'Imię jest wymagane',
  })
  .refine((data) => data.businessType !== 'individual' || data.lastName.length > 1, {
    path: ['lastName'],
    message: 'Nazwisko jest wymagane',
  })
  .refine((data) => data.businessType !== 'company' || data.nip.length === 10, {
    path: ['nip'],
    message: 'Wymagany jest poprawny numer NIP',
  });

export type StripeOnboardingValues = z.infer<typeof stripeOnboardingSchema>;
