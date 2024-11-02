import { Request, Response } from 'express'
import { Controller, ServerError } from '@/core'
import { getLogger } from '@/infra/providers/logger'
import { GetProductService } from '@/application/services/GetProduct/GetProductService'

export class GetProductController extends Controller {
  constructor(private getProductService: GetProductService) {
    super()
  }

  protected async handle(request: Request, response: Response): Promise<any> {
    const logger = getLogger({
      controller: 'GetProductController',
      method: request.method,
      params: request.params
    })

    try {
      const getProduct = await this.getProductService.execute({
        code: request.params.code
      })

      if (getProduct.isLeft()) {
        const error: ServerError = getProduct.value.getErrorValue()
        logger.error(error)
        return this.fail(response, error)
      }

      const data = getProduct.value.getValue()

      logger.info(data)

      return this.ok(response, data)
    } catch (error) {
      logger.error(error)
      return this.fail(response)
    }
  }
}
