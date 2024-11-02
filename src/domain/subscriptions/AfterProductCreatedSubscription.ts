import { Handler, DomainEvents, EventHandle } from '@/core'
import { getLogger } from '@/infra/providers/logger'
import { ProductCreated } from '@/domain/events/ProductCreated'

export class AfterProductCreatedSubscription implements EventHandle {
  constructor(private handlers: Array<Handler>) {}

  subscribe(): void {
    const logger = getLogger({
      subscription: 'AfterProductCreatedSubscription'
    })

    DomainEvents.register(async (professionalCreated: ProductCreated) => {
      try {
        await Promise.all(
          this.handlers.map(handler => {
            return handler.execute(professionalCreated)
          })
        )
      } catch (error) {
        logger.error(error)
      }
    }, ProductCreated.name)
  }
}
