import { AggregateRoot, DomainEvents } from '@/core'

export interface Dispatcher {
  dispatchEventsForAggregate(entity: AggregateRoot<any>): void
}
