import { z } from 'zod';
import { IntlShape } from '@/utils/types';

export const feedbackFormSchema = (t: IntlShape) =>
  z
    .object({
      appFeeling: z.enum(['bad', 'mixed', 'good']).optional(),
      appFeelingDescription: z.string().optional(),
      radio: z.string({ required_error: t('COMMON_REQUIRED_FIELD') }).min(1, t('COMMON_REQUIRED_FIELD')),
      other: z.string().optional(),
    })
    .refine((data) => data.radio !== 'other' || (data.radio === 'other' && data.other && data.other.length > 0), {
      path: ['other'],
      message: t('FEEDBACK_REQUIRED_FIELD_OTHER'),
    });

export type FeedbackValues = z.infer<ReturnType<typeof feedbackFormSchema>>;
