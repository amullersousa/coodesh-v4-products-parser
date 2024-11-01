import { Server } from '@/infra/http/server/Server'
import { databaseLauncher } from '@/infra/providers/database'
import { EventsSubscription } from '@/application/EventsSubscription'
import { getLogger } from '@/infra/providers/logger'

export class Bootstrap {
  constructor(private server: Server, private eventsSubscription: EventsSubscription) {}

  public async start(): Promise<void> {
    const logger = getLogger({
      application: 'Bootstrap'
    })

    try {
      this.eventsSubscription.subscriptions().forEach(eventHandle => {
        eventHandle.subscribe()
      })

      await Promise.all(
        this.providersLauchers.map(providerLaucher => {
          return providerLaucher()
        })
      )

      await this.server.start()

      logger.info('Application is running')
    } catch (error) {
      this.providersStoppers.forEach(providerStopper => {
        providerStopper()
      })
      this.server.stop()
      logger.error(error)
    }
  }

  private get providersLauchers(): any[] {
    return [databaseLauncher]
  }

  private get providersStoppers(): any[] {
    return []
  }
}
