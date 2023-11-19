'use server';

import { supportFormSchema } from '@/components/support-form/_utils';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';
import { getUserMailFromSession } from '@/utils/get-data-from-session';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PW,
  },
});

const actionSendSupportTicket = async (prevState: FormState, data: FormData) => {
  const formSchemaParsed = supportFormSchema.safeParse({ message: data.get('message') });
  const email = getUserMailFromSession();

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }
  try {
    await transporter.sendMail({
      from: email,
      to: 'cratun.dev@gmail.com',
      subject: 'Support ticket',
      html: data.get('message'),
    });
  } catch {
    return getResponse('Coś poszło nie tak. Spróbuj ponownię lub napisz do nas na maila: cratun.dev@gmail.com', false);
  }

  return getResponse('Wiadomość została wysłana. Skontaktujemy się z Tobą najszybciej jak będzie to możliwe.', true);
};

export default actionSendSupportTicket;
