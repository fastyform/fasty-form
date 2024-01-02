import StripeConstants from './stripe-constants';

const calculateStripeFee = (price: number) =>
  price * StripeConstants.STRIPE_FEE_PERCENTAGE + StripeConstants.STRIPE_FEE_FIXED_IN_GROSZ;
export default calculateStripeFee;
