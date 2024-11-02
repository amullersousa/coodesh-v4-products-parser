import { Request, Response } from 'express'
import { Controller, ServerError } from '@/core'
import { getLogger } from '@/infra/providers/logger'
import { GetProductsService } from '@/application/services/GetProducts/GetProductsService'

export class GetProductsController extends Controller {
  constructor(private getProductService: GetProductsService) {
    super()
  }

  protected async handle(request: Request, response: Response): Promise<any> {
    const logger = getLogger({
      controller: 'GetProductsController',
      method: request.method,
      params: request.params
    })

    try {
      const getProducts = await this.getProductService.execute({
        code: request.params.code
      })

      if (getProducts.isLeft()) {
        const error: ServerError = getProducts.value.getErrorValue()
        logger.error(error)
        return this.fail(response, error)
      }

      const data = getProducts.value.getValue()

      logger.info(data)

      return this.ok(response, data)
    } catch (error) {
      logger.error(error)
      return this.fail(response)
    }
  }
}
