import config from '@/config'
import { Logger } from '@/infra/providers/logger/Logger'
import { ObjectUtils } from '@/utils'

export class ConsoleLogger implements Logger {
  private defaultMeta: any

  public setDefaultMeta<M extends any>(meta: M): void {
    this.defaultMeta = meta
  }

  public info(info?: any): void {
    if (config.logger.enabled) {
      console.info(
        ObjectUtils.merge(this.defaultMeta, {
          dateTimeOccurred: new Date(),
          info
        })
      )
    }
  }

  public error(error?: any): void {
    if (config.logger.enabled) {
      console.error(
        ObjectUtils.merge(this.defaultMeta, {
          dateTimeOccurred: new Date(),
          error
        })
      )
    }
  }

  public empty(): void {
    if (config.logger.enabled) {
      console.log(
        ObjectUtils.merge(this.defaultMeta, {
          dateTimeOccurred: new Date()
        })
      )
    }
  }
}
