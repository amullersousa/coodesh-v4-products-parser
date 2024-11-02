import { Mapper, Result } from '@/core'
import { Product, ProductProps } from '@/domain/entities'
import { ProductPayload } from '@/application/payloads'
import { ProductDate, ProductImageURL, ProductURL } from '@/domain/value-objects'

interface UpdateProductMapperDTO {
  product: Product
  productPayload: Partial<ProductPayload>
}

export namespace UpdateProductMapper {
  export class PayloadToDomain implements Mapper<UpdateProductMapperDTO, Product> {
    map({ productPayload, product }: UpdateProductMapperDTO): Result<Product> {
      const updateProps: Partial<ProductProps> = {}

      if (productPayload.url) {
        const crateProductURL = ProductURL.create(productPayload.url)

        if (crateProductURL.isFailure) {
          return Result.fail<Product>(crateProductURL.getErrorValue())
        }

        updateProps.URL = crateProductURL.getValue()
      }

      if (productPayload.image_url) {
        const updateProductImageURL = ProductImageURL.create(productPayload.image_url)

        if (updateProductImageURL.isFailure) {
          return Result.fail<Product>(updateProductImageURL.getErrorValue())
        }

        updateProps.imageURL = updateProductImageURL.getValue()
      }

      if (productPayload.created_t) {
        const createCreatedAt = ProductDate.create(productPayload.created_t)

        if (createCreatedAt.isFailure) {
          return Result.fail<Product>(createCreatedAt.getErrorValue())
        }

        updateProps.createdAt = createCreatedAt.getValue()
      }

      if (productPayload.last_modified_t) {
        const createLastModifiedAt = ProductDate.create(productPayload.last_modified_t)

        if (createLastModifiedAt.isFailure) {
          return Result.fail<Product>(createLastModifiedAt.getErrorValue())
        }

        updateProps.lastModifiedAt = createLastModifiedAt.getValue()
      }

      if (productPayload.creator) {
        updateProps.creator = productPayload.creator
      }

      if (productPayload.product_name) {
        updateProps.productName = productPayload.product_name
      }

      if (productPayload.quantity) {
        updateProps.quantity = productPayload.quantity
      }

      if (productPayload.brands) {
        updateProps.brands = productPayload.brands
      }

      if (productPayload.categories) {
        updateProps.categories = productPayload.categories
      }

      if (productPayload.labels) {
        updateProps.labels = productPayload.labels
      }

      if (productPayload.cities) {
        updateProps.cities = productPayload.cities
      }

      if (productPayload.purchase_places) {
        updateProps.purchasePlaces = productPayload.purchase_places
      }

      if (productPayload.stores) {
        updateProps.stores = productPayload.stores
      }

      if (productPayload.ingredients_text) {
        updateProps.ingredientsText = productPayload.ingredients_text
      }

      if (productPayload.traces) {
        updateProps.traces = productPayload.traces
      }

      if (productPayload.serving_size) {
        updateProps.servingSize = productPayload.serving_size
      }

      if (productPayload.serving_quantity) {
        updateProps.servingQuantity = productPayload.serving_quantity
      }

      if (productPayload.nutriscore_score) {
        updateProps.nutriscoreScore = productPayload.nutriscore_score
      }

      if (productPayload.nutriscore_grade) {
        updateProps.nutriscoreGrade = productPayload.nutriscore_grade
      }

      if (productPayload.main_category) {
        updateProps.mainCategory = productPayload.main_category
      }

      const updateProduct = product.update(updateProps)

      if (updateProduct.isFailure) {
        return Result.fail<Product>(updateProduct.getErrorValue())
      }

      return Result.ok<Product>(product)
    }
  }
}
