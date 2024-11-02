import { Result, Service, right, ServerError, left, AppErrors } from '@/core'
import { FindProductByCodeService } from '@/application/services/FindProductByCode/FindProductByCodeService'
import { GetProductResponse } from './GetProductResponse'
import { GetProductDTO, GetProductResponseDTO } from './GetProductDTO'
import { GetProductMapper } from './GetProductMapper'
import { getLogger } from '@/infra/providers/logger'

export class GetProductService
  implements Service<GetProductDTO, Promise<GetProductResponse>>
{
  constructor(private findProductByCodeService: FindProductByCodeService) {}

  public async execute(getProductDTO: GetProductDTO): Promise<GetProductResponse> {
    getLogger({
      service: 'GetProductService',
      dto: getProductDTO
    }).empty()

    const findProductByCode = await this.findProductByCodeService.execute({
      code: getProductDTO.code
    })

    if (findProductByCode.isLeft()) {
      const error: ServerError = findProductByCode.value.getErrorValue()
      return left(Result.fail<ServerError>(error))
    }

    const mapper = new GetProductMapper.ToResponseDTO()
    const productMap = mapper.map(findProductByCode.value.getValue())

    if (productMap.isFailure) {
      return left(new AppErrors.Payload(productMap.getErrorValue().toString()))
    }

    return right(Result.ok<GetProductResponseDTO>(productMap.getValue()))
  }
}
