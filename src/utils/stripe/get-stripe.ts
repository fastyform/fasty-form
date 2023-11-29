'use server';

import Stripe from 'stripe';

const getStripe = () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  if (!stripe) throw new Error();

  return stripe;
};

export default getStripe;
