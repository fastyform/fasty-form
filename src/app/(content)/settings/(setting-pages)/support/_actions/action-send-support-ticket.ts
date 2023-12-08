'use server';

import { supportFormSchema } from '@/app/(content)/settings/(setting-pages)/support/_utils';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';
import getUserFromSession from '@/utils/get-user-from-session';

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

const actionSendSupportTicket = async (prevState: FormState, data: FormData) => {
  const formSchemaParsed = supportFormSchema.safeParse({ message: data.get('message') });
  const { email } = await getUserFromSession();

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }
  try {
    await transporter.sendMail({
      from: email,
      to: SUPPORT_MAIL,
      subject: 'Support ticket',
      html: data.get('message'),
    });
  } catch {
    return getResponse(
      `Ups, wystąpił problem. Spróbuj jeszcze raz lub napisz do nas na adres: ${SUPPORT_MAIL} - chętnie pomożemy!`,
    );
  }

  return getResponse('Twoja wiadomość została wysłana. Odezwiemy się do Ciebie jak najszybciej. Dziękujemy!', true);
};

export default actionSendSupportTicket;
