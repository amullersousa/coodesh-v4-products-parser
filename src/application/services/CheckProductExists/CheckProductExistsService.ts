import { AppErrors, Result, Service, left, right } from '@/core'
import { ProductRepository } from '@/infra/repositories/ProductRepository'
import { CheckProductExistsDTO } from './CheckProductExistsDTO'
import { CheckProductExistsResponse } from './CheckProductExistsResponse'
import { ProductCode } from '@/domain/value-objects'

export class CheckProductExistsService
  implements Service<CheckProductExistsDTO, Promise<CheckProductExistsResponse>>
{
  constructor(private productRepository: ProductRepository) {}

  public async execute(
    checkProductExistsDTO: CheckProductExistsDTO
  ): Promise<CheckProductExistsResponse> {
    const createProductCode = ProductCode.create(checkProductExistsDTO.code)

    if (createProductCode.isFailure) {
      return left(new AppErrors.Payload(createProductCode.getErrorValue().toString()))
    }

    const productCode = createProductCode.getValue()

    const productAlreadyExists = await this.productRepository.exists(productCode)
    return right(Result.ok<boolean>(productAlreadyExists))
  }
}
