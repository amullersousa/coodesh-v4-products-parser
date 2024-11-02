import { Either, Result, ServerError } from '@/core'

export type CheckProductExistsResponse = Either<Result<ServerError>, Result<boolean>>
