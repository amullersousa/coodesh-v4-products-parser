import { Result } from '@/core'
import { Products } from '@/domain/entities'

export interface ProductsRepository {
  find(): Promise<Result<Products>>
}
