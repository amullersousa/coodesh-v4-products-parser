import { AppErrors, Either, ServerError, Result } from '@/core'
import { GetAppInfoResponseDTO } from './GetAppInfoDTO'

export type GetAppInfoResponse = Either<
  AppErrors.Payload | Result<ServerError>,
  Result<GetAppInfoResponseDTO>
>
