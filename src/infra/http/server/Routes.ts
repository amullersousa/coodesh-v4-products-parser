import { RouteBuilder } from '@/core/RouteBuilder'
import { Request, Response, Router } from 'express'
import config from '@/config'

export class Routes extends RouteBuilder {
  constructor() {
    super(config.server.basePath)
  }

  protected routes(): Router {
    const router: Router = Router()

    router.get('/', (request: Request, response: Response) => {
      return response.send("Yo! we're up")
    })

    return router
  }
}
