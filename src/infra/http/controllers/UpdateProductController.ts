import { Request, Response } from 'express'
import { Controller, ServerError } from '@/core'
import { getLogger } from '@/infra/providers/logger'
import { UpdateProductService } from '@/application/services/UpdateProduct/UpdateProductService'
import { ObjectUtils } from '@/utils'

export class UpdateProductController extends Controller {
  constructor(private updateProductService: UpdateProductService) {
    super()
  }

  protected async handle(request: Request, response: Response): Promise<any> {
    const logger = getLogger({
      controller: 'UpdateProductController',
      method: request.method,
      params: request.params
    })

    try {
      const getProduct = await this.updateProductService.execute(
        ObjectUtils.merge(request.body, {
          code: request.params.code
        })
      )

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
