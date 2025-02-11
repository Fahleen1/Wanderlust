import { User } from '../models/user.model';
import nodemailer from 'nodemailer';

interface SendEmailProps {
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}
export const sendEmail = async ({ emailType, userId }: SendEmailProps) => {
  try {
    // Fetch user from the database
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const email = user.email;
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: 'maddison53@ethereal.email',
        pass: 'jn7jnAPss4f63QBp6D',
      },
    });

    const mailOptions = {
      from: 'fahleenarifali13@gmail.com', // sender address
      to: 'email', // list of receivers
      subject:
        emailType == 'VERIFY' ? 'Verify your email' : 'Reset your password',
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
