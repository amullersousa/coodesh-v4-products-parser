import { Result, Service, right, ServerError, left, AppErrors } from '@/core'
import { CreateProductService } from '@/application/services/CreateProduct/CreateProductService'
import { UpdateProductService } from '@/application/services/UpdateProduct/UpdateProductService'
import { ProductImportService } from '@/infra/services/ProductImportService'
import { CheckProductExistsService } from '@/application/services/CheckProductExists/CheckProductExistsService'
import { ImportProductResponse } from './ImportProductResponse'

const PROMISES_BATCH_SIZE = 5
const MAX_PRODUCTS_PER_DELTA = 1 // @TODO mudar pra pedido do desafio (100)

export class ImportProductService
  implements Service<void, Promise<ImportProductResponse>>
{
  constructor(
    private productImportService: ProductImportService,
    private checkProductExistsService: CheckProductExistsService,
    private createProductService: CreateProductService,
    private updateProductService: UpdateProductService
  ) {}

  private async promisesBatches(promises) {
    const results = []

    for (let i = 0; i < promises.length; i += PROMISES_BATCH_SIZE) {
      const batch = promises.slice(i, i + PROMISES_BATCH_SIZE)
      const batchResults = await Promise.allSettled(batch)
      results.push(...batchResults)
    }

    return results
  }

  public async execute(): Promise<ImportProductResponse> {
    const getDelta = await this.productImportService.getDelta()

    if (getDelta.isFailure) {
      const message = getDelta.getErrorValue().toString()
      return left(new AppErrors.Payload(message))
    }

    const delta = getDelta.getValue()

    await Promise.all(
      delta.map(async filename => {
        const getProducts = await this.productImportService.getProducts(
          filename,
          MAX_PRODUCTS_PER_DELTA
        )

        if (getProducts.isFailure) {
          const message = getProducts.getErrorValue().toString()
          return left(new AppErrors.Payload(message))
        }

        const payloads = getProducts.getValue()

        const promises = payloads.map(async payload => {
          const checkProductExists = await this.checkProductExistsService.execute({
            code: payload.code
          })

          if (checkProductExists.isLeft()) {
            const error: ServerError = checkProductExists.value.getErrorValue()
            return left(Result.fail<ServerError>(error))
          }

          const productExists = checkProductExists.value.getValue()

          if (productExists) {
            const updateProduct = await this.updateProductService.execute(payload)

            if (updateProduct.isLeft()) {
              const error: ServerError = updateProduct.value.getErrorValue()
              return left(Result.fail<ServerError>(error))
            }
          } else {
            const createProduct = await this.createProductService.execute(payload)

            if (createProduct.isLeft()) {
              const error: ServerError = createProduct.value.getErrorValue()
              return left(Result.fail<ServerError>(error))
            }
          }

          return right(Result.ok())
        })

        // @TODO fazer tratamento dos error e atualizar ImportHistory como total de erros
        this.promisesBatches(promises)
      })
    )

    return right(Result.ok<void>())
  }
}
