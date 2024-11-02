import { ServerError, Result } from '@/core'
import { ProductMapper } from '@/application/mappers'
import { Product, ProductID } from '@/domain/entities'
import { ProductRepository } from '@/infra/repositories/ProductRepository'
import { ProductCode } from '@/domain/value-objects'

export class SequelizeProductRepository implements ProductRepository {
  constructor(private models: any) {}

  async exists(criteria: ProductID | ProductCode): Promise<boolean> {
    let where

    if (criteria instanceof ProductCode) {
      where = {
        code: criteria.value
      }
    } else {
      where = {
        id: criteria.id.toString()
      }
    }

    const product = await this.models.Product.findOne({
      where
    })

    return !!product
  }

  async findByProductCode(productCode: ProductCode): Promise<Result<Product>> {
    const rawProduct = await this.models.Product.findOne({
      where: {
        code: productCode.value
      }
    })

    if (rawProduct) {
      const productMap = new ProductMapper.RawToProduct().map(rawProduct)

      if (productMap.isFailure) {
        return Result.fail<Product>(productMap.getErrorValue())
      }

      const product: Product = productMap.getValue()

      return Result.ok<Product>(product)
    }
  }

  async findByProductId(productId: ProductID): Promise<Result<Product>> {
    const rawProduct = await this.models.Product.findOne({
      where: {
        id: productId.id.toString()
      }
    })

    if (rawProduct) {
      const productMap = new ProductMapper.RawToProduct().map(rawProduct)

      if (productMap.isFailure) {
        return Result.fail<Product>(productMap.getErrorValue())
      }

      const product: Product = productMap.getValue()

      return Result.ok<Product>(product)
    }
  }

  async save(product: Product): Promise<Result<void> | Result<ServerError>> {
    const rawProduct = await new ProductMapper.ProductToRaw().map(product)

    if (rawProduct.isFailure) {
      return Result.fail<ServerError>(
        'Error when trying to convert product entity to persist'
      )
    }

    const exists = await this.exists(product.productId)
    const raw = rawProduct.getValue()

    if (exists) {
      await this.models.Product.update(raw, {
        individualHooks: true,
        where: {
          id: raw.id
        }
      })
    } else {
      await this.models.Product.create(raw)
    }

    return Result.ok<void>()
  }
}
