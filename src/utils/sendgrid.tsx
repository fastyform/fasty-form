import 'server-only';
import requestClient from '@sendgrid/client';
import mailClient from '@sendgrid/mail';
import Constants from '@/utils/constants';

mailClient.setApiKey(process.env.SENDGRID_API_KEY!);
requestClient.setApiKey(process.env.SENDGRID_API_KEY!);

interface SendMailData {
  html: string;
  subject: string;
  to: string;
  shouldThrow?: boolean;
  attachments?: mailClient.MailDataRequired['attachments'];
  sendAt?: number;
}

const from = {
  name: Constants.APP_NAME,
  email: Constants.SUPPORT_MAIL,
} as const;

export const sendMail = async ({ to, html, subject, shouldThrow = false, attachments, sendAt }: SendMailData) => {
  try {
    await mailClient.send({
      from,
      to,
      subject,
      html,
      attachments,
      sendAt,
    });
  } catch (error) {
    if (shouldThrow) {
      throw error;
    }
    console.error(error);
  }
};

interface SendMultipleData {
  mails: { email: string }[];
  html: string;
  subject: string;
}

export const sendMultipleMails = async ({ mails, subject, html }: SendMultipleData) => {
  try {
    await mailClient.sendMultiple({
      to: mails,
      from,
      subject,
      html,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addContactToList = async (email: string) => {
  await requestClient.request({
    url: '/v3/marketing/contacts',
    method: 'PUT',
    body: {
      list_ids: [process.env.SENDGRID_AMBASSADOR_LIST_ID!],
      contacts: [{ email }],
    },
  });
};
