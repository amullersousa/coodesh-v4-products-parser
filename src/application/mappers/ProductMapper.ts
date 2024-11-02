import { Mapper, Result, UniqueEntityID } from '@/core'
import { Product, ProductStatus } from '@/domain/entities'
import {
  ProductCode,
  ProductDate,
  ProductImageURL,
  ProductURL
} from '@/domain/value-objects'

export namespace ProductMapper {
  export type Raw = {
    id: string
    code: string
    status: ProductStatus
    imported_t: Date
    url: string
    creator: string
    created_t: Date
    last_modified_t: Date
    product_name: string
    quantity: string
    brands: string
    categories: string
    labels: string
    cities: string
    purchase_places: string
    stores: string
    ingredients_text: string
    traces: string
    serving_size: string
    serving_quantity: number
    nutriscore_score: number
    nutriscore_grade: string
    main_category: string
    image_url: string
  }

  export class RawToProduct implements Mapper<Raw, Product> {
    map(raw: Raw): Result<Product> {
      const createProductURL = ProductURL.create(raw.url)
      const createProductImageURL = ProductImageURL.create(raw.image_url)
      const createProductCode = ProductCode.create(raw.code)
      const createCreatedAt = ProductDate.create(raw.created_t)
      const createLastModifiedAt = ProductDate.create(raw.last_modified_t)
      const createImportedAt = ProductDate.create()

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

      const productId = new UniqueEntityID(raw.id)

      const createProduct = Product.create(
        {
          URL: productURL,
          imageURL: productImageURL,
          code: productCode,
          importedAt: createdAt,
          lastModifiedAt: lastModifiedAt,
          createdAt: importedAt,
          status: raw.status,
          creator: raw.creator,
          productName: raw.product_name,
          quantity: raw.quantity,
          brands: raw.brands,
          categories: raw.categories,
          labels: raw.labels,
          cities: raw.cities,
          purchasePlaces: raw.purchase_places,
          stores: raw.stores,
          ingredientsText: raw.ingredients_text,
          traces: raw.traces,
          servingSize: raw.serving_size,
          servingQuantity: raw.serving_quantity,
          nutriscoreScore: raw.nutriscore_score,
          nutriscoreGrade: raw.nutriscore_grade,
          mainCategory: raw.main_category
        },
        productId
      )

      if (createProduct.isFailure) {
        return Result.fail<Product>(createProduct.getErrorValue())
      }

      const product: Product = createProduct.getValue()

      return Result.ok<Product>(product)
    }
  }

  export class ProductToRaw implements Mapper<Product, Raw> {
    map(product: Product): Result<Raw> {
      const props = {
        id: product.productId.id.toString(),
        url: product.URL.value,
        image_url: product.imageURL.value,
        code: product.code.value,
        imported_t: product.importedAt.value,
        last_modified_t: product.lastModifiedAt.value,
        created_t: product.createdAt.value,
        status: product.status,
        creator: product.creator,
        product_name: product.productName,
        quantity: product.quantity,
        brands: product.brands,
        categories: product.categories,
        labels: product.labels,
        cities: product.cities,
        purchase_places: product.purchasePlaces,
        stores: product.stores,
        ingredients_text: product.ingredientsText,
        traces: product.traces,
        serving_size: product.servingSize,
        serving_quantity: product.servingQuantity,
        nutriscore_score: product.nutriscoreScore,
        nutriscore_grade: product.nutriscoreGrade,
        main_category: product.mainCategory
      }

      return Result.ok<Raw>(props)
    }
  }
}
