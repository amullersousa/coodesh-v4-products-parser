import { ErrorTypes } from './ErrorTypes'

interface Error {
  type: ErrorTypes
  message: string
  code: string
}

export abstract class ServerError implements Error {
  constructor(
    public readonly message: string,
    public readonly type: ErrorTypes,
    public readonly code: string
  ) {}
}
