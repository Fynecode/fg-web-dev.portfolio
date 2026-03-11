import { Resend } from 'resend'; 
import { RESEND_KEY, RESEND_EMAIL, FYNECODE_EMAIL } from '../config/config.js';

const resend = new Resend(RESEND_KEY);

export const sendEmail = async (message, email, name) => {
  try {
    const response = await resend.emails.send({
      from: RESEND_EMAIL,
      to: [FYNECODE_EMAIL],
      subject: 'Fynecode Enquiry',
      html: `
        <h2>New Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    return response ;
  } catch (error) {
    throw new Error(error);
  }
};

export const sendResetEmail = async ({ to, name, resetLink }) => {
  try {
    const response = await resend.emails.send({
      from: RESEND_EMAIL,
      to: [to],
      subject: 'Reset your password',
      html: `
        <h2>Password Reset</h2>
        <p>Hi ${name || 'there'},</p>
        <p>You requested a password reset. Click the link below to set a new password. This link expires in 15 minutes.</p>
        <p><a href="${resetLink}">Reset Password</a></p>
        <p>If you did not request this, you can ignore this email.</p>
      `,
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
