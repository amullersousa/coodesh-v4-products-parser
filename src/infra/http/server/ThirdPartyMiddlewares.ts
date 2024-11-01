import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import { ThirdPartyBuilder, ThirdPartyMiddleware } from '@/core/ThirdPartyBuilder'
import config from '@/config'

export class ThirdPartyMiddlewares extends ThirdPartyBuilder {
  public middlewares(): Array<ThirdPartyMiddleware> {
    return [
      cors({
        origin: config.server.allowedOrigins.split(';')
      }),
      bodyParser.json({ limit: '10mb' }),
      bodyParser.urlencoded({ extended: true }),
      compression(),
      helmet(),
      morgan('combined')
    ]
  }
}
