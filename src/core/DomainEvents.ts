import { AggregateRoot } from './AggregateRoot'
import { UniqueEntityID } from './UniqueEntityID'

export interface DomainEvent {
  dateTimeOccurred: Date
  getAggregateId(): UniqueEntityID
}

export class DomainEvents {
  private static handlersMap = new Map<string, Array<(event: DomainEvent) => void>>()
  private static markedAggregates: AggregateRoot<any>[] = []

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id)

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register(
    callback: (event: DomainEvent) => void,
    eventName: string
  ): void {
    const handlers = this.handlersMap.get(eventName) || []
    handlers.push(callback)
    this.handlersMap.set(eventName, handlers)
  }

  private static findMarkedAggregateByID(
    id: UniqueEntityID
  ): AggregateRoot<any> | undefined {
    return this.markedAggregates.find(aggregate => aggregate.id.equals(id))
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: DomainEvent) => {
      this.dispatch(event)
    })
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>
  ): void {
    const index = this.markedAggregates.findIndex(a => a.equals(aggregate))
    this.markedAggregates.splice(index, 1)
  }

  private static dispatch(event: DomainEvent): void {
    const handlers = this.handlersMap.get(event.constructor.name)

    if (handlers) {
      handlers.forEach(callback => {
        callback(event)
      })
    }
  }
}
