import { Result, Service, right, ServerError, left, AppErrors } from '@/core'
import { FindProductsService } from '@/application/services/FindProducts/FindProductsService'
import { getLogger } from '@/infra/providers/logger'
import { GetProductsResponse } from './GetProductsResponse'
import { GetProductsDTO, GetProductsResponseDTO } from './GetProductsDTO'
import { GetProductsMapper } from './GetProductsMapper'

export class GetProductsService
  implements Service<GetProductsDTO, Promise<GetProductsResponse>>
{
  constructor(private findProductsService: FindProductsService) {}

  public async execute(getProductsDTO: GetProductsDTO): Promise<GetProductsResponse> {
    getLogger({
      service: 'GetProductsService',
      dto: getProductsDTO
    }).empty()

    const findProducts = await this.findProductsService.execute()

    if (findProducts.isLeft()) {
      const error: ServerError = findProducts.value.getErrorValue()
      return left(Result.fail<ServerError>(error))
    }

    const mapper = new GetProductsMapper.ToResponseDTO()
    const productMap = mapper.map(findProducts.value.getValue())

    if (productMap.isFailure) {
      return left(new AppErrors.Payload(productMap.getErrorValue().toString()))
    }

    return right(Result.ok<GetProductsResponseDTO>(productMap.getValue()))
  }
}
