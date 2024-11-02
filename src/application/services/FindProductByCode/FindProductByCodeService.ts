import { AppErrors, Result, Service, left, right } from '@/core'
import { ProductRepository } from '@/infra/repositories/ProductRepository'
import { ProductCode } from '@/domain/value-objects'
import { Product } from '@/domain/entities'
import { FindProductByCodeDTO } from './FindProductByCodeDTO'
import { FindProductByCodeResponse } from './FindProductByCodeResponse'
import { FindProductByCodeErrors } from './FindProductByCodeErrors'

export class FindProductByCodeService
  implements Service<FindProductByCodeDTO, Promise<FindProductByCodeResponse>>
{
  constructor(private productRepository: ProductRepository) {}

  public async execute(
    findProductByCodeDTO: FindProductByCodeDTO
  ): Promise<FindProductByCodeResponse> {
    const productCode = ProductCode.create(findProductByCodeDTO.code)

    if (productCode.isFailure) {
      const message = productCode.getErrorValue().toString()
      return left(new AppErrors.Payload(message))
    }

    const productExists = await this.productRepository.exists(productCode.getValue())

    if (!productExists) {
      const productNotFoundByCode = new FindProductByCodeErrors.ProductNotFoundByCode(
        productCode.getValue().value
      )
      return left(productNotFoundByCode)
    }

    const findByProductCode = await this.productRepository.findByProductCode(
      productCode.getValue()
    )

    if (findByProductCode.isFailure) {
      const productCouldNotBeSearched =
        new FindProductByCodeErrors.ProductCouldNotBeSearched()
      return left(productCouldNotBeSearched)
    }

    const product: Product = findByProductCode.getValue()

    return right(Result.ok<Product>(product))
  }
}
