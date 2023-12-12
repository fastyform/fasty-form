'use server';

import { contactFormSchema } from '@/app/(legal-contact)/contact/_utils';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

const SUPPORT_MAIL = process.env.NODEMAILER_EMAIL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SUPPORT_MAIL,
    pass: process.env.NODEMAILER_PW,
  },
});

const actionSendContactForm = async (prevState: FormState, data: FormData) => {
  const formSchemaParsed = contactFormSchema.safeParse({ message: data.get('message'), email: data.get('email') });

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }
  try {
    await transporter.sendMail({
      from: formSchemaParsed.data.email,
      to: SUPPORT_MAIL,
      subject: 'Contact form - not logged in user',
      html: formSchemaParsed.data.message,
    });
  } catch {
    return getResponse(
      `Ups, wystąpił problem. Spróbuj jeszcze raz lub napisz do nas na adres: ${SUPPORT_MAIL} - chętnie pomożemy!`,
    );
  }

  return getResponse('Twoja wiadomość została wysłana. Odezwiemy się do Ciebie jak najszybciej. Dziękujemy!', true);
};

export default actionSendContactForm;
