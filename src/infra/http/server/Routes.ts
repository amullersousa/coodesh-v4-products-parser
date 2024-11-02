import { RouteBuilder } from '@/core/RouteBuilder'
import { Request, Response, Router } from 'express'
import config from '@/config'
import {
  deleteProductController,
  getAppInfoController,
  getProductController,
  getProductsController,
  updateProductController
} from '@/infra/http/controllers'
import { authorizationMiddleware } from '@/infra/http/middlewares'
import { importProductService } from '@/application/services/ImportProduct'

export class Routes extends RouteBuilder {
  constructor() {
    super(config.server.basePath)
  }

  protected routes(): Router {
    const router: Router = Router()

    // @TODO para testar o serviço de importação
    router.get('/import-test', async (request: Request, response: Response) => {
      console.log('running')
      await importProductService.execute()
      return response.send()
    })

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
