'use server';

import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';

interface Payload {
  fileId: string;
}

const actionGenerateFileLink = async ({ fileId }: Payload) => {
  const stripe = getStripe();

  const fileLink = await stripe.fileLinks.create({ file: fileId });

  return fileLink.url as string;
};

export default actionGenerateFileLink;
