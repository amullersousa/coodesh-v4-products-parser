import { DomainEvents, DomainEvent } from './DomainEvents'
import { Entity } from './Entity'
import { UniqueEntityID } from './UniqueEntityID'

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = []

  get id(): UniqueEntityID {
    return this._id
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length)
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }
}
