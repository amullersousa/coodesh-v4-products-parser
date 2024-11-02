import { Result, Service, right, ServerError, left, AppErrors } from '@/core'
import { SaveProductService } from '@/application/services/SaveProduct/SaveProductService'
import { CheckProductExistsService } from '@/application/services/CheckProductExists/CheckProductExistsService'
import { FindProductByCodeService } from '@/application/services/FindProductByCode/FindProductByCodeService'
import { ProductPayload } from '@/application/payloads'
import { UpdateProductResponse } from './UpdateProductResponse'
import { UpdateProductErrors } from './UpdateProductErrors'
import { UpdateProductMapper } from './UpdateProductMapper'

export class UpdateProductService
  implements Service<ProductPayload, Promise<UpdateProductResponse>>
{
  constructor(
    private checkProductExistsService: CheckProductExistsService,
    private findProductByCodeService: FindProductByCodeService,
    private saveProductService: SaveProductService
  ) {}

  public async execute(
    productPayload: Partial<ProductPayload>
  ): Promise<UpdateProductResponse> {
    const checkProductExists = await this.checkProductExistsService.execute({
      code: productPayload.code
    })

    if (checkProductExists.isLeft()) {
      const error: ServerError = checkProductExists.value.getErrorValue()
      return left(Result.fail<ServerError>(error))
    }

    const productNotExists = !checkProductExists.value.getValue()

    if (productNotExists) {
      const codeAlreadyExists = new UpdateProductErrors.CodeNotExists(productPayload.code)
      return left(codeAlreadyExists)
    }

    const findProductByCode = await this.findProductByCodeService.execute({
      code: productPayload.code
    })

    if (findProductByCode.isLeft()) {
      const error: ServerError = findProductByCode.value.getErrorValue()
      return left(Result.fail<ServerError>(error))
    }

    const product = findProductByCode.value.getValue()

    const productMap = new UpdateProductMapper.PayloadToDomain().map({
      product,
      productPayload
    })

    if (productMap.isFailure) {
      return left(new AppErrors.Payload(productMap.getErrorValue().toString()))
    }

    const saveProduct = await this.saveProductService.execute({
      product: productMap.getValue()
    })

    if (saveProduct.isLeft()) {
      const error: ServerError = saveProduct.value.getErrorValue()
      return left(Result.fail<ServerError>(error))
    }

    return right(Result.ok<void>())
  }
}
