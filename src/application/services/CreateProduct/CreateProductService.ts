import { Result, Service, right, ServerError, left, AppErrors } from '@/core'
import { SaveProductService } from '@/application/services/SaveProduct/SaveProductService'
import { CheckProductExistsService } from '@/application/services/CheckProductExists/CheckProductExistsService'
import { CreateProductResponse } from './CreateProductResponse'
import { ProductPayload } from '@/application/payloads'
import { Product } from '@/domain/entities'
import { CreateProductMapper } from './CreateProductMapper'
import { CreateProductErrors } from './CreateProductErrors'

export class CreateProductService
  implements Service<ProductPayload, Promise<CreateProductResponse>>
{
  constructor(
    private checkProductExistsService: CheckProductExistsService,
    private saveProductService: SaveProductService
  ) {}

  public async execute(productPayload: ProductPayload): Promise<CreateProductResponse> {
    const checkProductExists = await this.checkProductExistsService.execute({
      code: productPayload.code
    })

    if (checkProductExists.isLeft()) {
      const error: ServerError = checkProductExists.value.getErrorValue()
      return left(Result.fail<ServerError>(error))
    }

    const productExists = checkProductExists.value.getValue()

    if (productExists) {
      const codeAlreadyExists = new CreateProductErrors.CodeAlreadyExists(
        productPayload.code
      )
      return left(codeAlreadyExists)
    }

    const productMap = new CreateProductMapper.PayloadToDomain().map(productPayload)

    if (productMap.isFailure) {
      return left(new AppErrors.Payload(productMap.getErrorValue().toString()))
    }

    const product: Product = productMap.getValue()

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
