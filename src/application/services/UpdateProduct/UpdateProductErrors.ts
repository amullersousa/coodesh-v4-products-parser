import { ServerError, ErrorTypes, Result } from '@/core'

export namespace UpdateProductErrors {
  export class CodeNotExists extends Result<ServerError> {
    constructor(code: string) {
      const props = {
        message: `The code ${code} associated for this product not exists.`,
        type: ErrorTypes.Conflict,
        code: 'CODE_NOT_EXISTS'
      }

      super(false, props)
    }
  }
}
