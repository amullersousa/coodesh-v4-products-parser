import { Transporter as NodemailerTransporter } from 'nodemailer'
import { Mailer, MailerProps } from '@/infra/providers/mailer/Mailer'
import config from '@/config'

export class NodemailerMailer implements Mailer {
  constructor(private transporter: NodemailerTransporter) {}

  async sendEmail(props: MailerProps): Promise<any> {
    if (config.mailer.enabled) {
      await this.transporter.sendMail({
        from: props.from,
        to: props.to,
        subject: props.subject,
        html: props.text
      })
    }
    return Promise.resolve()
  }
}
