export const PRODUCTION_ORIGIN_URL = 'https://fastyform.com';

const Constants = {
  COMMON_ERROR_MESSAGE: 'Hmm, napotkaliśmy nieoczekiwany błąd. Daj nam chwilę i spróbuj ponownie za jakiś czas.',
  ORIGIN_URL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : PRODUCTION_ORIGIN_URL,
  APP_NAME: 'FastyForm',
} as const;

export default Constants;
