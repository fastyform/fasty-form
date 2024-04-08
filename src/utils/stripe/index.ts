const GROSZ_MULTIPLIER = 100;

export const groszToPLN = (amount: number) => amount / GROSZ_MULTIPLIER;
export const PLNToGrosz = (amount: number) => amount * GROSZ_MULTIPLIER;

export const StripeConstants = {
  CURRENCY: 'pln',
  STRIPE_FEE_PERCENTAGE: 0.02,
  STRIPE_FEE_FIXED_IN_GROSZ: 100,
} as const;

export const APP_FEE = 0.03;

export const calculateStripeFee = (price: number) =>
  price * APP_FEE + price * StripeConstants.STRIPE_FEE_PERCENTAGE + StripeConstants.STRIPE_FEE_FIXED_IN_GROSZ;

export const calculateAppFee = (price: number) => price * APP_FEE;
