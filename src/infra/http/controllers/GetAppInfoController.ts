import { Request, Response } from 'express'
import { Controller, ServerError } from '@/core'
import { getLogger } from '@/infra/providers/logger'
import { GetAppInfoService } from '@/application/services/GetAppInfo/GetAppInfoService'

export class GetAppInfoController extends Controller {
  constructor(private getAppInfoService: GetAppInfoService) {
    super()
  }

  protected async handle(request: Request, response: Response): Promise<any> {
    const logger = getLogger({
      controller: 'GetAppInfoController',
      method: request.method,
      params: request.params
    })

    try {
      const getAppInfo = await this.getAppInfoService.execute()

      if (getAppInfo.isLeft()) {
        const error: ServerError = getAppInfo.value.getErrorValue()
        logger.error(error)
        return this.fail(response, error)
      }

      const data = getAppInfo.value.getValue()

      logger.info(data)

      return this.ok(response, data)
    } catch (error) {
      logger.error(error)
      return this.fail(response)
    }
  }
}
