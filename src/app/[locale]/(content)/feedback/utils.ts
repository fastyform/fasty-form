import { z } from 'zod';

export const feedbackFormSchema = z
  .object({
    appFeeling: z.enum(['bad', 'mixed', 'good']).optional(),
    appFeelingDescription: z.string().optional(),
    radio: z.string({ required_error: 'To pole jest wymagane.' }).min(1, 'To pole jest wymagane.'),
    other: z.string().optional(),
  })
  .refine((data) => data.radio !== 'other' || (data.radio === 'other' && data.other && data.other.length > 0), {
    path: ['other'],
    message: 'To pole jest wymagane, jeśli wybrano "inne"',
  });

export type FeedbackValues = z.infer<typeof feedbackFormSchema>;
