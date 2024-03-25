import 'server-only';
import Stripe from 'stripe';

const getStripe = () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  return stripe;
};

export default getStripe;
