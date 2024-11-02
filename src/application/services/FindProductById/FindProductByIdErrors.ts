import { Result, ServerError, ErrorTypes } from '@/core'

export namespace FindProductByIdErrors {
  export class ProductNotFoundById extends Result<ServerError> {
    constructor(id: string) {
      const props = {
        message: `Product not found by id ${id}.`,
        type: ErrorTypes.Conflict,
        code: 'PRODUCT_NOT_FOUND_BY_ID'
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
