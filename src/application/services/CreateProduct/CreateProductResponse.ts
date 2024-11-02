import { AppErrors, Either, ServerError, Result } from '@/core'

export type CreateProductResponse = Either<
  AppErrors.Payload | Result<ServerError>,
  Result<void>
>
