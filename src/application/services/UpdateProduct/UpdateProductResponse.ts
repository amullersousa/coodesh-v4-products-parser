import { AppErrors, Either, ServerError, Result } from '@/core'

export type UpdateProductResponse = Either<
  AppErrors.Payload | Result<ServerError>,
  Result<void>
>
