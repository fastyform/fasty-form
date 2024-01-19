export const PRODUCTION_ORIGIN_URL = 'https://www.fastyform.com';

const Constants = {
  COMMON_ERROR_MESSAGE: 'Hmm, napotkaliśmy nieoczekiwany błąd. Daj nam chwilę i spróbuj ponownie za jakiś czas.',
  ORIGIN_URL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : PRODUCTION_ORIGIN_URL,
  APP_NAME: 'FastyForm',
} as const;

export const PROTECTED_ROUTES = ['/submissions', '/settings', '/onboarding', '/edit-profile', '/stripe'];
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

export default Constants;
