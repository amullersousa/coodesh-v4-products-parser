import express from 'express'
import config from '@/config'
import { Routes } from './Routes'
import { ThirdPartyMiddlewares } from './ThirdPartyMiddlewares'
import { getLogger } from '@/infra/providers/logger'

export class Server {
  private app = express()

  constructor(
    private routes: Routes,
    private thirdPartyMiddlewares: ThirdPartyMiddlewares
  ) {}

  public start(): Promise<void> {
    const logger = getLogger({
      application: 'Server'
    })

    return new Promise(resolve => {
      this.app.use(this.thirdPartyMiddlewares.middlewares())
      this.app.use(this.routes.build())

      this.app.listen(config.server.port, () => {
        logger.info(`It is running on port ${config.server.port}`)
        resolve()
      })
    })
  }

  public stop(): void {}
}
