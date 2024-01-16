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

const sendMail = async (mailOptions: MailOptions) => {
  await new Promise((resolve, reject) => {
    transporter.sendMail({ ...mailOptions, from: `${Constants.APP_NAME} ${SUPPORT_MAIL}` }, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

export default sendMail;
