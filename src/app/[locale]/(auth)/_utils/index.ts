import { z } from 'zod';
import { IntlShape } from '@/utils/types';
import { emailValidator, newPasswordValidator } from '@/utils/validators';

export const QUERY_PARAM_ERRORS = ['ALREADY_REGISTERED', 'UNEXPECTED', 'NOT_REGISTERED'] as const;

export type QueryParamError = (typeof QUERY_PARAM_ERRORS)[number];

export const getQueryParamError = (queryParam: QueryParamError) => `error=${queryParam}`;

export const registerSchema = (t: IntlShape) =>
  z.object({
    email: emailValidator(t),
    password: newPasswordValidator(t),
  });

export type FormValues = z.infer<ReturnType<typeof registerSchema>>;
