import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  private transporter: Mail;
  constructor(
    private readonly config: ConfigService
  ) {
    this.transporter = createTransport({
      host: config.get('smtpHost'),
      port: 2525,
      secure: false,
      auth: {
        user: config.get('smtpUsername'),
        pass: config.get('smtpPassword'),
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
