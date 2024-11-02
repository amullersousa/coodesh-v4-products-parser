import { AppErrors, Either, ServerError, Result } from '@/core'

export type SaveProductResponse = Either<
  AppErrors.Payload | Result<ServerError>,
  Result<void>
>
