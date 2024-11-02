import { AppErrors, Either, ServerError, Result } from '@/core'

export type DeleteProductResponse = Either<
  AppErrors.Payload | Result<ServerError>,
  Result<void>
>
