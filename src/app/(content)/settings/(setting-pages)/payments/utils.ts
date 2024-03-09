import { z } from 'zod';

export const stripeOnboardingSchema = z
  .object({
    businessType: z.enum(['individual', 'company']),
    firstName: z.string(),
    lastName: z.string(),
    nip: z.string(),
  })
  .refine((data) => data.businessType !== 'individual' || data.firstName.length > 0, {
    path: ['firstName'],
    message: 'Imię jest wymagane',
  })
  .refine((data) => data.businessType !== 'individual' || data.lastName.length > 0, {
    path: ['lastName'],
    message: 'Nazwisko jest wymagane',
  })
  .refine((data) => data.businessType !== 'company' || data.nip.length === 10, {
    path: ['nip'],
    message: 'Wymagany jest poprawny numer NIP',
  });

export type StripeOnboardingValues = z.infer<typeof stripeOnboardingSchema>;

export type ReportType = 'connected_account_balance_change_from_activity.itemized.3' | 'connected_account_payouts.itemized.3';

export const reportTypeToLabel: Record<ReportType, string> = {
  'connected_account_balance_change_from_activity.itemized.3': 'Szczegółowa rozpiska zmian salda',
  'connected_account_payouts.itemized.3': 'Szczegółowa rozpiska wypłat',
};

export const ALLOWED_REPORT_TYPES = Object.keys(reportTypeToLabel) as ReportType[];
