import { Request, Response } from 'express'
import { Controller, ServerError } from '@/core'
import { getLogger } from '@/infra/providers/logger'
import { DeleteProductService } from '@/application/services/DeleteProduct/DeleteProductService'

export class DeleteProductController extends Controller {
  constructor(private deleteProductService: DeleteProductService) {
    super()
  }

  protected async handle(request: Request, response: Response): Promise<any> {
    const logger = getLogger({
      controller: 'DeleteProductController',
      method: request.method,
      params: request.params
    })

    try {
      const deleteProduct = await this.deleteProductService.execute({
        code: request.params.code
      })

      if (deleteProduct.isLeft()) {
        const error: ServerError = deleteProduct.value.getErrorValue()
        logger.error(error)
        return this.fail(response, error)
      }

      const data = deleteProduct.value.getValue()

      logger.info(data)

      return this.ok(response, data)
    } catch (error) {
      logger.error(error)
      return this.fail(response)
    }
  }
}
