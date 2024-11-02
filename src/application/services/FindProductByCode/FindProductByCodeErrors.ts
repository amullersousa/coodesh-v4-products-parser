import { Result, ServerError, ErrorTypes } from '@/core'

export namespace FindProductByCodeErrors {
  export class ProductNotFoundByCode extends Result<ServerError> {
    constructor(code: string) {
      const props = {
        message: `Product not found by code ${code}.`,
        type: ErrorTypes.Conflict,
        code: 'PRODUCT_NOT_FOUND_BY_CODE'
      }

      super(false, props)
    }
  }

  export class ProductCouldNotBeSearched extends Result<ServerError> {
    constructor() {
      const props = {
        message: 'There was an error and the product could not be searched',
        type: ErrorTypes.InternalServerError,
        code: 'PRODUCT_COULD_NOT_BE_SEARCHED'
      }
      super(false, props)
    }
  }
}
