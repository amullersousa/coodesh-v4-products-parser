import { AppErrors, Result, Service, UniqueEntityID, left, right } from '@/core'
import { ProductRepository } from '@/infra/repositories/ProductRepository'
import { Product, ProductID } from '@/domain/entities'
import { FindProductByIdDTO } from './FindProductByIdDTO'
import { FindProductByIdResponse } from './FindProductByIdResponse'
import { FindProductByIdErrors } from './FindProductByIdErrors'

export class FindProductByIdService
  implements Service<FindProductByIdDTO, Promise<FindProductByIdResponse>>
{
  constructor(private productRepository: ProductRepository) {}

  public async execute(
    findProductByIdDTO: FindProductByIdDTO
  ): Promise<FindProductByIdResponse> {
    const productId = ProductID.create(new UniqueEntityID(findProductByIdDTO.productId))

    if (productId.isFailure) {
      const message = productId.getErrorValue().toString()
      return left(new AppErrors.Payload(message))
    }

    const productExists = await this.productRepository.exists(productId.getValue())

    if (!productExists) {
      const productNotFoundById = new FindProductByIdErrors.ProductNotFoundById(
        productId.getValue().id.toString()
      )
      return left(productNotFoundById)
    }

    const findByProductId = await this.productRepository.findByProductId(
      productId.getValue()
    )

    if (findByProductId.isFailure) {
      const productCouldNotBeSearched =
        new FindProductByIdErrors.ProductCouldNotBeSearched()
      return left(productCouldNotBeSearched)
    }

    const product: Product = findByProductId.getValue()

    return right(Result.ok<Product>(product))
  }
}
