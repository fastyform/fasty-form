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
        App feelings: {data.appFeeling || 'EMPTY'}
        <br />
        App feelings additional info: {data.appFeelingDescription || 'EMPTY'}
        <br />
        Features radio: {data.radio}
        <br />
        Features other: {data.other}
      </MailTemplate>,
    ),
    shouldThrow: true,
  });
};

export default actionSendFeedback;
