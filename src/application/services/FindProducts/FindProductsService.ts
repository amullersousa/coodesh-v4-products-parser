import { Result, Service, left, right } from '@/core'
import { Products } from '@/domain/entities'
import { ProductsRepository } from '@/infra/repositories/ProductsRepository'
import { FindProductsDTO } from './FindProductsDTO'
import { FindProductsResponse } from './FindProductsResponse'
import { FindProductsErrors } from './FindProductsErrors'

export class FindProductsService
  implements Service<FindProductsDTO, Promise<FindProductsResponse>>
{
  constructor(private productsRepository: ProductsRepository) {}

  public async execute(): Promise<FindProductsResponse> {
    const find = await this.productsRepository.find()

    if (find.isFailure) {
      const productsCouldNotBeSearched =
        new FindProductsErrors.ProductsCouldNotBeSearched()
      return left(productsCouldNotBeSearched)
    }

    const products: Products = find.getValue()

    return right(Result.ok<Products>(products))
  }
}
