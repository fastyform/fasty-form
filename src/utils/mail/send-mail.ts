import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import Constants from '@/utils/constants';

const SUPPORT_MAIL = process.env.NODEMAILER_EMAIL;

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: Number(process.env.NODEMAILER_PORT),
  auth: {
    user: SUPPORT_MAIL,
    pass: process.env.NODEMAILER_PW,
  },
});

const sendMail = (mailOptions: MailOptions, errorCallback?: () => void) => {
  transporter.sendMail({ ...mailOptions, from: `${Constants.APP_NAME} ${SUPPORT_MAIL}` }, (error: Error | null) => {
    if (error && errorCallback) {
      errorCallback();
    }
  });
};

export default sendMail;
