import { AppErrors, Either, ServerError, Result } from '@/core'
import { GetProductsResponseDTO } from './GetProductsDTO'

export type GetProductsResponse = Either<
  AppErrors.Payload | Result<ServerError>,
  Result<GetProductsResponseDTO>
>
