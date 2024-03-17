import StripeConstants from './stripe-constants';

export const APP_FEE = 0.03;

export const calculateStripeFee = (price: number) =>
  price * APP_FEE + price * StripeConstants.STRIPE_FEE_PERCENTAGE + StripeConstants.STRIPE_FEE_FIXED_IN_GROSZ;

export const calculateAppFee = (price: number) => price * APP_FEE;
