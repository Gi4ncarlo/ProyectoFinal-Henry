import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendWelcomeEmail(to: string, username: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Welcome to Vicnasol App!',
      text: `Hello ${username},\n\nThank you for signing up to our platform. We're excited to have you with us!`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
