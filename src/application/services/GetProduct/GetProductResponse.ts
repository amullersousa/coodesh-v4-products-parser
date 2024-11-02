import { AppErrors, Either, ServerError, Result } from '@/core'
import { GetProductResponseDTO } from './GetProductDTO'

export type GetProductResponse = Either<
  AppErrors.Payload | Result<ServerError>,
  Result<GetProductResponseDTO>
>
