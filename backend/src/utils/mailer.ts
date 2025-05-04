import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (
  email: string,
  name: string,
  link: string,
) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Tester" <test@example.com>',
    to: email,
    subject: 'Verify your email',
    html: `
      <p>Hi ${name},</p>
      <p>Click the link below to verify your email:</p>
      <a href="${link}">Verify Email</a>
    `,
  });

  // Log the URL where you can see the test email
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  return info;
};

