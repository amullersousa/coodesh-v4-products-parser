import { AppErrors, Either, Result } from '@/core'
import { Product } from '@/domain/entities'
import { FindProductByIdErrors } from './FindProductByIdErrors'

export type FindProductByIdResponse = Either<
  | FindProductByIdErrors.ProductNotFoundById
  | FindProductByIdErrors.ProductCouldNotBeSearched
  | AppErrors.Payload,
  Result<Product>
>
