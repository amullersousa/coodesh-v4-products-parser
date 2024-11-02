import { Mapper, Result } from '@/core'
import { Product, ProductStatus } from '@/domain/entities'
import { ProductPayload } from '@/application/payloads'
import {
  ProductCode,
  ProductDate,
  ProductImageURL,
  ProductURL
} from '@/domain/value-objects'

export namespace CreateProductMapper {
  export class PayloadToDomain implements Mapper<ProductPayload, Product> {
    map(payload: ProductPayload): Result<Product> {
      const createProductURL = ProductURL.create(payload.url)
      const createProductImageURL = ProductImageURL.create(payload.image_url)
      const createProductCode = ProductCode.create(payload.code)
      const createCreatedAt = ProductDate.create(payload.created_t)
      const createLastModifiedAt = ProductDate.create(payload.last_modified_t)
      const createImportedAt = ProductDate.create(new Date())

      const combine = Result.combine([
        createProductURL,
        createProductImageURL,
        createCreatedAt,
        createLastModifiedAt,
        createImportedAt
      ])

      if (combine.isFailure) {
        return Result.fail<Product>(combine.getErrorValue())
      }

      const productURL = createProductURL.getValue()
      const productImageURL = createProductImageURL.getValue()
      const productCode = createProductCode.getValue()
      const createdAt = createCreatedAt.getValue()
      const lastModifiedAt = createLastModifiedAt.getValue()
      const importedAt = createImportedAt.getValue()

      const createProduct = Product.create({
        URL: productURL,
        imageURL: productImageURL,
        code: productCode,
        status: ProductStatus.DRAFT,
        importedAt: importedAt,
        creator: payload.creator,
        createdAt: createdAt,
        lastModifiedAt: lastModifiedAt,
        productName: payload.product_name,
        quantity: payload.quantity,
        brands: payload.brands,
        categories: payload.categories,
        labels: payload.labels,
        cities: payload.cities,
        purchasePlaces: payload.purchase_places,
        stores: payload.stores,
        ingredientsText: payload.ingredients_text,
        traces: payload.traces,
        servingSize: payload.serving_size,
        servingQuantity: payload.serving_quantity,
        nutriscoreScore: payload.nutriscore_score,
        nutriscoreGrade: payload.nutriscore_grade,
        mainCategory: payload.main_category
      })

      if (createProduct.isFailure) {
        return Result.fail<Product>(createProduct.getErrorValue())
      }

      const product: Product = createProduct.getValue()

      return Result.ok<Product>(product)
    }
  }
}
