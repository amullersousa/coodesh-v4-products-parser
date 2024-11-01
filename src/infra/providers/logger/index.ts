import { ConsoleLogger } from './console/ConsoleLogger'
import { Logger } from './Logger'

export function getLogger<M extends any>(meta: M): Logger {
  const consoleLogger = new ConsoleLogger()
  consoleLogger.setDefaultMeta(meta)
  return consoleLogger
}
