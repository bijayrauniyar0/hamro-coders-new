import nodemailer from 'nodemailer';
import { EMAIL_ID, EMAIL_PW } from '../constants';

export const sendVerificationEmail = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for port 465, false for 587
    auth: {
      user: EMAIL_ID, // your Zoho email
      pass: EMAIL_PW, // app password if 2FA is enabled
    },
  });
  const info = await transporter.sendMail({
    from: `"Mock Sewa" ${EMAIL_ID}`, // sender address
    to: email,
    subject: 'Verify your email',
    html,
  });

  return info;
};
