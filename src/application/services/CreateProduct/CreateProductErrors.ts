import { ServerError, ErrorTypes, Result } from '@/core'

export namespace CreateProductErrors {
  export class CodeAlreadyExists extends Result<ServerError> {
    constructor(code: string) {
      const props = {
        message: `The code ${code} associated for this product already exists.`,
        type: ErrorTypes.Conflict,
        code: 'CODE_ALREADY_EXISTS'
      }

      super(false, props)
    }
  }
}
