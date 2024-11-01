export type MailerProps = {
  from: string
  to: string
  subject: string
  text: string
}

export interface Mailer {
  sendEmail(props: MailerProps): Promise<void>
}
