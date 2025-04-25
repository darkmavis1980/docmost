import Client from '@sendgrid/client';
import sgMail from '@sendgrid/mail';
import { Logger } from '@nestjs/common';
import { MailDriver } from './interfaces/mail-driver.interface';
import { SendGridConfig } from '../interfaces';
import { MailMessage } from '../interfaces/mail.message';
import { mailLogName } from '../mail.utils';

export class SendGridDriver implements MailDriver {
  private readonly logger = new Logger(mailLogName(SendGridDriver.name));
  private readonly sendgridClient: Client;

  constructor(config: SendGridConfig) {
    this.sendgridClient = sgMail;
    this.sendgridClient.setApiKey(config.sendgridApiKey)
  }

  async sendMail(message: MailMessage): Promise<void> {
    try {
      await this.sendgridClient.send({
        ...message,
      });
      this.logger.debug(`Sent mail to ${message.to}`);
    } catch (err) {
      this.logger.warn(`Failed to send mail to ${message.to}: ${err}`);
      throw err;
    }
  }
}
