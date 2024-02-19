import 'server-only';
import client from '@sendgrid/mail';
import Constants from '@/utils/constants';

client.setApiKey(process.env.SENDGRID_API_KEY!);

interface SendMailData {
  html: string;
  subject: string;
  to: string;
  shouldThrow?: boolean;
}

export const sendMail = async ({ to, html, subject, shouldThrow = false }: SendMailData) => {
  try {
    await client.send({
      from: Constants.SUPPORT_MAIL,
      to,
      subject,
      html,
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
    await client.sendMultiple({
      to: mails,
      from: Constants.SUPPORT_MAIL,
      subject,
      html,
    });
  } catch (error) {
    console.error(error);
  }
};
