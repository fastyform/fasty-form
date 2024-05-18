import { z } from 'zod';
import { IntlShape, MessageKey } from '@/utils/types';

export const stripeOnboardingSchema = (t: IntlShape) =>
  z
    .object({
      businessType: z.enum(['individual', 'company']),
      firstName: z.string(),
      lastName: z.string(),
      nip: z.string(),
    })
    .refine((data) => data.businessType !== 'individual' || data.firstName.length > 0, {
      path: ['firstName'],
      message: t('PAYMENTS_STRIPE_ONBOARDING_ERROR_FIRST_NAME_REQUIRED'),
    })
    .refine((data) => data.businessType !== 'individual' || data.lastName.length > 0, {
      path: ['lastName'],
      message: t('PAYMENTS_STRIPE_ONBOARDING_ERROR_LAST_NAME'),
    })
    .refine((data) => data.businessType !== 'company' || data.nip.length === 10, {
      path: ['nip'],
      message: t('PAYMENTS_STRIPE_ONBOARDING_ERROR_TAX_ID_REQUIRED'),
    });

export type StripeOnboardingValues = z.infer<ReturnType<typeof stripeOnboardingSchema>>;

const reportTypeToLabel = {
  'connected_account_balance_change_from_activity.itemized.3': 'REPORT_TYPE_BALANCE_CHANGE_FROM_ACTIVITY_ITEMIZED_3',
  'connected_account_payouts.itemized.3': 'REPORT_TYPE_PAYOUTS_ITEMIZED_3',
  'connected_account_ending_balance_reconciliation.itemized.2': 'REPORT_TYPE_ENDING_BALANCE_RECONCILIATION',
} as const satisfies Record<string, MessageKey>;

export type ReportType = keyof typeof reportTypeToLabel;

export { reportTypeToLabel };

export const ALLOWED_REPORT_TYPES = Object.keys(reportTypeToLabel) as ReportType[];
