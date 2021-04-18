import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  private transporter: Mail;
  constructor() {
    this.transporter = createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      secure: false,
      auth: {
        user: '6f94764bd27ee7',
        pass: '81a8b7d428eb8d',
      },
      logger: true
    });
  }

  async broadcast(recipients, html, text, from, subject) {
    recipients.forEach(async (to) => {
      try {
        await this.transporter.sendMail({
          from: from,
          to: to,
          subject: subject,
          text: text,
          html: html,
          headers: { 'x-cloudmta-class': 'standard' }
        })
      }
      catch {
        console.log('Send email failed for ', to);
      }
    });
  }
}
