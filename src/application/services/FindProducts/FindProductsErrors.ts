import { Result, ServerError, ErrorTypes } from '@/core'

export namespace FindProductsErrors {
  export class ProductsCouldNotBeSearched extends Result<ServerError> {
    constructor() {
      const props = {
        message: 'There was an error and the products could not be searched',
        type: ErrorTypes.InternalServerError,
        code: 'PRODUCTS_COULD_NOT_BE_SEARCHED'
      }
      super(false, props)
    }
  }
}
