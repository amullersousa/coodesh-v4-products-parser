import { RouteBuilder } from '@/core/RouteBuilder'
import { Router } from 'express'
import config from '@/config'
import {
  deleteProductController,
  getAppInfoController,
  getProductController,
  getProductsController,
  updateProductController
} from '@/infra/http/controllers'
import { authorizationMiddleware } from '@/infra/http/middlewares'

export class Routes extends RouteBuilder {
  constructor() {
    super(config.server.basePath)
  }

  protected routes(): Router {
    const router: Router = Router()

    router.get('/', authorizationMiddleware.ensureApiKey(), getAppInfoController.execute)

    router.get(
      '/products/:code',
      authorizationMiddleware.ensureApiKey(),
      getProductController.execute
    )

    router.delete(
      '/products/:code',
      authorizationMiddleware.ensureApiKey(),
      deleteProductController.execute
    )

    router.put(
      '/products/:code',
      authorizationMiddleware.ensureApiKey(),
      updateProductController.execute
    )

    router.get(
      '/products',
      authorizationMiddleware.ensureApiKey(),
      getProductsController.execute
    )

    return router
  }
}
