import { Mapper, Result } from '@/core'
import { Products } from '@/domain/entities'
import { GetProductsResponseDTO } from './GetProductsDTO'

export namespace GetProductsMapper {
  export class ToResponseDTO implements Mapper<Products, GetProductsResponseDTO> {
    map(products: Products): Result<GetProductsResponseDTO> {
      return Result.ok(
        products.getItems().map(product => ({
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
        }))
      )
    }
  }
}
