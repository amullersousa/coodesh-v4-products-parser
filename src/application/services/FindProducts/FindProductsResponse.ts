import { AppErrors, Either, Result } from '@/core'
import { Products } from '@/domain/entities'
import { FindProductsErrors } from './FindProductsErrors'

export type FindProductsResponse = Either<
  FindProductsErrors.ProductsCouldNotBeSearched | AppErrors.Payload,
  Result<Products>
>
