import { Mapper, Result } from '@/core'
import { Products } from '@/domain/entities'
import { ProductMapper } from './ProductMapper'
import { ProductPayload } from '../payloads'

export namespace ProductsMapper {
  export type Raw = Array<ProductMapper.Raw>

  export class RawToDomain implements Mapper<Raw, Products> {
    map(raw: Raw): Result<Products> {
      const productsResults = raw.map(rawProducts => {
        const mapper = new ProductMapper.RawToProduct()
        return mapper.map(rawProducts)
      })

      const productsMap = Result.combine(productsResults)

      if (productsMap.isFailure) {
        return Result.fail<Products>(productsMap.getErrorValue())
      }

      const products = Products.create(
        productsResults.map(productsResults => productsResults.getValue())
      )

      return Result.ok<Products>(products)
    }
  }

  export class DomainToRaw implements Mapper<Products, Raw> {
    map(products: Products): Result<Raw> {
      const props = products.getItems().map(product => {
        const mapper = new ProductMapper.ProductToRaw()
        const rawProductMap = mapper.map(product)

        return rawProductMap.getValue()
      })

      return Result.ok<Raw>(props)
    }
  }

  // export class PayloadToDomain implements Mapper<Array<ProductPayload>, Products> {
  //   map(payloads: Array<ProductPayload>): Result<Products> {
  //     const productsResults = payloads.map(rawProducts => {
  //       const mapper = new ProductMapper.PayloadToProduct()
  //       return mapper.map(rawProducts)
  //     })

  //     const productsMap = Result.combine(productsResults)

  //     if (productsMap.isFailure) {
  //       return Result.fail<Products>(productsMap.getErrorValue())
  //     }

  //     const products = Products.create(
  //       productsResults.map(productsResults => productsResults.getValue())
  //     )

  //     return Result.ok<Products>(products)
  //   }
  // }
}
