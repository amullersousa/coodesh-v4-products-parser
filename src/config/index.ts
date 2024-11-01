import application from './application'
import server from './server'
import jwt from './jwt'
import aws from './aws'
import mailer from './mailer'
import logger from './logger'

export default {
  isProduction: false,
  application,
  server,
  jwt,
  aws,
  mailer,
  logger
}
