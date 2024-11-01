import { Result } from './Result'
import { ServerError } from './Error'
import { ErrorTypes } from './ErrorTypes'

export namespace AppErrors {
  export class Custom extends Result<ServerError> {
    constructor(error: ServerError) {
      super(false, error)
    }
  }

  export class Unexpected extends Result<ServerError> {
    public constructor() {
      super(false, {
        type: ErrorTypes.InternalServerError,
        message: `An unexpected error`,
        code: 'UNEXPECTED'
      })
    }
  }

  export class Payload extends Result<ServerError> {
    constructor(message: string) {
      super(false, {
        type: ErrorTypes.BadRequest,
        message,
        code: 'PAYLOAD'
      })
    }
  }
}
