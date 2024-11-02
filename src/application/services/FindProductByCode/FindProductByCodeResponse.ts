import { AppErrors, Either, Result } from '@/core'
import { Product } from '@/domain/entities'
import { FindProductByCodeErrors } from './FindProductByCodeErrors'

export type FindProductByCodeResponse = Either<
  | FindProductByCodeErrors.ProductNotFoundByCode
  | FindProductByCodeErrors.ProductCouldNotBeSearched
  | AppErrors.Payload,
  Result<Product>
>
