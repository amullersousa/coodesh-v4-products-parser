import { ServerError, ErrorTypes, Result } from '@/core'

export namespace SaveProductErrors {
  export class ProductCouldNotBeSaved extends Result<ServerError> {
    constructor() {
      const props = {
        message: 'There was an error and the product could not be saved',
        type: ErrorTypes.InternalServerError,
        code: 'PRODUCT_COULD_NOT_BE_SAVED'
      }
      super(false, props)
    }
  }
}
