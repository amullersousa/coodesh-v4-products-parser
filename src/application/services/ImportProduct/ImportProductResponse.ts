import { AppErrors, Either, ServerError, Result } from '@/core'

export type ImportProductResponse = Either<
  AppErrors.Payload | Result<ServerError>,
  Result<void>
>
