import { Mapper, Result } from '@/core'
import { Product } from '@/domain/entities'
import { GetProductResponseDTO } from './GetProductDTO'

export namespace GetProductMapper {
  export class ToResponseDTO implements Mapper<Product, GetProductResponseDTO> {
    map(product: Product): Result<GetProductResponseDTO> {
      return Result.ok<GetProductResponseDTO>({
        url: product.URL.value,
        image_url: product.imageURL.value,
        code: product.code.value,
        status: product.status,
        imported_t: product.importedAt,
        creator: product.creator,
        created_t: product.createdAt,
        last_modified_t: product.lastModifiedAt,
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
      })
    }
  }
}
