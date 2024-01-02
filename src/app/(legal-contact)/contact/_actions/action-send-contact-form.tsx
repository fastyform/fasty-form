'use server';

import { render } from '@react-email/render';
import { contactFormSchema } from '@/app/(legal-contact)/contact/_utils';
import { getResponse } from '@/utils';
import { FormState } from '@/utils/form';
import MailTemplate from '@/utils/mail/mail-template';
import sendMail from '@/utils/mail/send-mail';

const SUPPORT_MAIL = process.env.NODEMAILER_EMAIL;

const actionSendContactForm = async (prevState: FormState, data: FormData) => {
  const formSchemaParsed = contactFormSchema.safeParse({ message: data.get('message'), email: data.get('email') });

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  try {
    sendMail({
      to: SUPPORT_MAIL,
      subject: 'Formularz kontatkowy',
      html: render(
        <MailTemplate title="Formularz kontaktowy">
          Email: {formSchemaParsed.data.email}
          <br />
          Wiadomość: {formSchemaParsed.data.message}
        </MailTemplate>,
      ),
    });
  } catch {
    return getResponse(
      `Ups, wystąpił problem. Spróbuj jeszcze raz lub napisz do nas na adres: ${SUPPORT_MAIL} - chętnie pomożemy!`,
    );
  }

  return getResponse('Twoja wiadomość została wysłana. Odezwiemy się do Ciebie jak najszybciej. Dziękujemy!', true);
};

export default actionSendContactForm;
