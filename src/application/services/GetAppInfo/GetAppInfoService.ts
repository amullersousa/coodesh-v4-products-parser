import { Result, Service, right } from '@/core'
import { getLogger } from '@/infra/providers/logger'
import { GetAppInfoResponse } from './GetAppInfoResponse'
import { GetAppInfoResponseDTO } from './GetAppInfoDTO'

// @TODO: Detalhes da API, se conexão leitura e escritura com a base de dados está OK, horário da última vez que o CRON foi executado, tempo online e uso de memória.

export class GetAppInfoService implements Service<void, Promise<GetAppInfoResponse>> {
  public async execute(): Promise<GetAppInfoResponse> {
    getLogger({
      service: 'GetAppInfoService'
    }).empty()

    const uptime = process.uptime()
    const memoryUsage = process.memoryUsage()

    const uptimeHours = Math.floor(uptime / 3600)
    const uptimeMinutes = Math.floor((uptime % 3600) / 60)
    const uptimeSeconds = Math.floor(uptime % 60)

    const getAppInfo = {
      uptime: `${uptimeHours}h ${uptimeMinutes}m ${uptimeSeconds}s`,
      memoryUsage: {
        rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`
      }
    }

    return right(Result.ok<GetAppInfoResponseDTO>(getAppInfo))
  }
}
