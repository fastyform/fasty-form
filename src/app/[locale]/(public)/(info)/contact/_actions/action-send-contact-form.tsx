'use server';

import { render } from '@react-email/render';
import { getTranslations } from 'next-intl/server';
import { contactFormSchema } from '@/app/[locale]/(public)/(info)/contact/_utils';
import MailTemplate from '@/emails/mail-template';
import { getResponse } from '@/utils';
import Constants from '@/utils/constants';
import { FormState } from '@/utils/form';
import { sendMail } from '@/utils/sendgrid';

const actionSendContactForm = async (prevState: FormState, data: FormData) => {
  const t = await getTranslations();
  const formSchemaParsed = contactFormSchema(t).safeParse({ message: data.get('message'), email: data.get('email') });

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  try {
    await sendMail({
      to: Constants.SUPPORT_MAIL,
      subject: 'Formularz kontaktowy',
      html: render(
        <MailTemplate title="Formularz kontaktowy">
          Email: {formSchemaParsed.data.email}
          <br />
          Wiadomość: {formSchemaParsed.data.message}
        </MailTemplate>,
      ),
      shouldThrow: true,
    });
  } catch {
    return getResponse(
      `Ups, wystąpił problem. Spróbuj jeszcze raz lub napisz do nas na adres: ${Constants.SUPPORT_MAIL} - chętnie pomożemy!`,
    );
  }

  return getResponse('Twoja wiadomość została wysłana. Odezwiemy się do Ciebie jak najszybciej. Dziękujemy!', true);
};

export default actionSendContactForm;
