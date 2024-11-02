import { Result, Service, right, left } from '@/core'
import { ProductRepository } from '@/infra/repositories/ProductRepository'
import { SaveProductResponse } from './SaveProductResponse'
import { SaveProductDTO } from './SaveProductDTO'
import { SaveProductErrors } from './SaveProductErrors'

export class SaveProductService
  implements Service<SaveProductDTO, Promise<SaveProductResponse>>
{
  constructor(private productRepository: ProductRepository) {}

  public async execute(saveProductDTO: SaveProductDTO): Promise<SaveProductResponse> {
    const saveProduct = await this.productRepository.save(saveProductDTO.product)

    if (saveProduct.isFailure) {
      const productCouldNotBeSaved = new SaveProductErrors.ProductCouldNotBeSaved()
      return left(productCouldNotBeSaved)
    }

    return right(Result.ok<void>())
  }
}
