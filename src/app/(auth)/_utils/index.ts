import Constants from '@/utils/constants';

export const QUERY_PARAM_ERRORS = {
  ALREADY_REGISTERED: 'Konto o podanym adresie email zostało już zarejestrowane.',
  UNEXPECTED: Constants.COMMON_ERROR_MESSAGE,
  NOT_REGISTERED: 'Konto o podanym adresie email nie zostało jeszcze zarejestrowane.',
} as const;

export type QueryParamError = keyof typeof QUERY_PARAM_ERRORS;

export const getQueryParamError = (queryParam: QueryParamError) => `error=${queryParam}`;
