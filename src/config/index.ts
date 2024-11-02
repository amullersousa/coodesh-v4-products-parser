import application from './application'
import server from './server'
import jwt from './jwt'
import mailer from './mailer'
import logger from './logger'
import importer from './importer'

export default {
  isProduction: false,
  application,
  server,
  jwt,
  mailer,
  logger,
  importer
}
