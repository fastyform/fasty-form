'use server';

import { render } from '@react-email/render';
import MailTemplate from '@/emails/mail-template';
import Constants from '@/utils/constants';
import getUserWithNull from '@/utils/get-user-with-null';
import { sendMail } from '@/utils/sendgrid';
import { FeedbackValues } from './utils';

const actionSendFeedback = async (data: FeedbackValues) => {
  const user = await getUserWithNull();

  await sendMail({
    to: Constants.SUPPORT_MAIL,
    subject: 'Feedback',
    html: render(
      <MailTemplate title="Feedback">
        Email: {user?.email}
        <br />
        Odczucia aplikacji: {data.appFeeling || 'nie wybrano'}
        <br />
        Odczucia aplikacji opis dodatkowy: {data.appFeelingDescription || 'nie wybrano'}
        <br />
        Featery radio: {data.radio}
        <br />
        Featery inne: {data.other}
      </MailTemplate>,
    ),
    shouldThrow: true,
  });
};

export default actionSendFeedback;
