import SMTPTransport from 'nodemailer/lib/smtp-transport';

export enum MailOption {
  SMTP = 'smtp',
  Postmark = 'postmark',
  SendGrid = 'sendgrid',
  Log = 'log',
}

export interface SMTPConfig extends SMTPTransport.Options {}
export interface PostmarkConfig {
  postmarkToken: string;
}
export interface SendGridConfig {
  sendgridApiKey: string;
}

export interface LogConfig {}

export type MailConfig =
  | { driver: MailOption.SMTP; config: SMTPConfig }
  | { driver: MailOption.Postmark; config: PostmarkConfig }
  | { driver: MailOption.SendGrid; config: SendGridConfig }
  | { driver: MailOption.Log; config: LogConfig };

export interface MailOptions {
  mail: MailConfig;
}

export interface MailOptionsFactory {
  createMailOptions(): Promise<MailConfig> | MailConfig;
}

export interface MailModuleOptions {
  imports?: any[];
}
