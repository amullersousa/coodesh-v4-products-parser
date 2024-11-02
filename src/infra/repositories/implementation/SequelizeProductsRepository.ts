import { Result } from '@/core'
import { Products } from '@/domain/entities'
import { ProductsRepository } from '@/infra/repositories/ProductsRepository'
import { ProductsMapper } from '@/application/mappers'

export class SequelizeProductsRepository implements ProductsRepository {
  constructor(private models: any) {}

  async find(): Promise<Result<Products>> {
    const rawProducts = await this.models.Product.findAll()

    if (rawProducts) {
      const AproversMap = new ProductsMapper.RawToDomain().map(rawProducts)

      if (AproversMap.isFailure) {
        return Result.fail<Products>(AproversMap.getErrorValue())
      }

      const products: Products = AproversMap.getValue()

      return Result.ok<Products>(products)
    }
  }
}
