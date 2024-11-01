import * as nodemailer from 'nodemailer'
import { NodemailerMailer } from './NodemailerMailer'
import config from '@/config'

const transporter = nodemailer.createTransport({
  host: config.mailer.host,
  port: parseInt(config.mailer.port),
  auth: {
    user: config.mailer.user,
    pass: config.mailer.pass
  }
})

export const nodemailerMailer = new NodemailerMailer(transporter)
