const Constants = {
  COMMON_ERROR_MESSAGE: 'Hmm, napotkaliśmy nieoczekiwany błąd. Daj nam chwilę i spróbuj ponownie za jakiś czas.',
  ORIGIN_URL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://fastyform.com/',
} as const;

export default Constants;
