import { Result, Service, right, ServerError, left, AppErrors } from '@/core'
import { getLogger } from '@/infra/providers/logger'
import { FindProductByCodeService } from '@/application/services/FindProductByCode/FindProductByCodeService'
import { SaveProductService } from '@/application/services/SaveProduct/SaveProductService'
import { DeleteProductResponse } from './DeleteProductResponse'
import { DeleteProductDTO } from './DeleteProductDTO'

export class DeleteProductService
  implements Service<DeleteProductDTO, Promise<DeleteProductResponse>>
{
  constructor(
    private findProductByCodeService: FindProductByCodeService,
    private saveProductService: SaveProductService
  ) {}

  public async execute(
    deleteProductDTO: DeleteProductDTO
  ): Promise<DeleteProductResponse> {
    getLogger({
      service: 'DeleteProductService',
      dto: deleteProductDTO
    }).empty()

    const findProductByCode = await this.findProductByCodeService.execute({
      code: deleteProductDTO.code
    })

    if (findProductByCode.isLeft()) {
      const error: ServerError = findProductByCode.value.getErrorValue()
      return left(Result.fail<ServerError>(error))
    }

    const product = findProductByCode.value.getValue()

    product.delete()

    const saveProduct = await this.saveProductService.execute({
      product
    })

    if (saveProduct.isLeft()) {
      const error: ServerError = saveProduct.value.getErrorValue()
      return left(Result.fail<ServerError>(error))
    }

    return right(Result.ok<void>())
  }
}
