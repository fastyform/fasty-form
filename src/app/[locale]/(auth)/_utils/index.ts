import { z } from 'zod';
import Constants from '@/utils/constants';
import { IntlShape } from '@/utils/types';
import { emailValidator, newPasswordValidator } from '@/utils/validators';

export const QUERY_PARAM_ERRORS = {
  ALREADY_REGISTERED: 'Konto o podanym adresie email zostało już zarejestrowane.',
  UNEXPECTED: Constants.COMMON_ERROR_MESSAGE,
  NOT_REGISTERED: 'Konto o podanym adresie email nie zostało jeszcze zarejestrowane.',
} as const;

export type QueryParamError = keyof typeof QUERY_PARAM_ERRORS;

export const getQueryParamError = (queryParam: QueryParamError) => `error=${queryParam}`;

export const registerSchema = (t: IntlShape) =>
  z.object({
    email: emailValidator(t),
    password: newPasswordValidator(t),
  });

export type FormValues = z.infer<ReturnType<typeof registerSchema>>;
