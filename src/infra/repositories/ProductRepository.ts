import { ServerError, Result } from '@/core'
import { Product, ProductID } from '@/domain/entities'
import { ProductCode } from '@/domain/value-objects'

export interface ProductRepository {
  exists(criteria: ProductID | ProductCode): Promise<boolean>
  findByProductId(productId: ProductID): Promise<Result<Product>>
  findByProductCode(productCode: ProductCode): Promise<Result<Product>>
  save(product: Product): Promise<Result<void> | Result<ServerError>>
}
