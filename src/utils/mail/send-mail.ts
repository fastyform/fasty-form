import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';

const SUPPORT_MAIL = process.env.NODEMAILER_EMAIL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SUPPORT_MAIL,
    pass: process.env.NODEMAILER_PW,
  },
});

const sendMail = async (mailOptions: MailOptions, errorCallback?: () => void) => {
  transporter.sendMail(mailOptions, (error: Error | null) => {
    if (error && errorCallback) {
      errorCallback();
    }
  });
};

export default sendMail;
