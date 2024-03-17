export const PRODUCTION_ORIGIN_URL = 'https://www.fastyform.com';

const Constants = {
  COMMON_ERROR_MESSAGE: 'Hmm, napotkaliśmy nieoczekiwany błąd. Daj nam chwilę i spróbuj ponownie za jakiś czas.',
  ORIGIN_URL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : PRODUCTION_ORIGIN_URL,
  APP_NAME: 'FastyForm',
  SUPPORT_MAIL: 'support@fastyform.com',
} as const;

export const PROTECTED_ROUTES = ['/submissions', '/settings', '/onboarding', '/edit-profile', '/stripe', '/payments'];
export const UNAVAILABLE_ROUTES_FOR_LOGGED_IN_USERS = ['/login', '/register', '/forgot-password'];
export const ALLOWED_ROUTES_FOR_INDEXING = [
  '/',
  '/register/client',
  '/register/trainer',
  '/terms-of-service',
  '/privacy-policy',
  '/contact',
  '/cookies',
  '/login',
  '/forgot-password',
];

export const COMPANY_INFO = 'Cratun sp. z o.o. NIP: 4990690625 KRS: 0000971816';
export const DATE_FORMAT = 'DD.MM.YY';

export default Constants;
