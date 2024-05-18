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
    return getResponse(t('CONTACT_FORM_SEND_ERROR', { supportMail: Constants.SUPPORT_MAIL }));
  }

  return getResponse(t('CONTACT_FORM_SEND_SUCCESS'), true);
};

export default actionSendContactForm;
