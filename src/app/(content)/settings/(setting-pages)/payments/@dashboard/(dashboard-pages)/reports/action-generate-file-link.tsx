'use server';

import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';

interface Payload {
  fileId: string;
  stripeAccountId: string;
}

const actionGenerateFileLink = async ({ fileId, stripeAccountId }: Payload) => {
  const stripe = getStripe();

  const fileLink = await stripe.fileLinks.create(
    {
      file: fileId,
    },
    {
      stripeAccount: stripeAccountId,
    },
  );

  return fileLink.url as string;
};

export default actionGenerateFileLink;
