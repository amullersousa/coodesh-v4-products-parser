import { DomainEvent } from './DomainEvents'

export abstract class Handler {
  protected abstract handle(event: DomainEvent): Promise<void | any>

  execute = async (event: DomainEvent) => {
    try {
      return this.handle(event)
    } catch (error) {
      return this.fail(event, error)
    }
  }

  public fail(event: DomainEvent, error: any) {
    return console.error(`[${event.constructor.name}]: Failed run: %s`, error)
  }

  public ok(event: DomainEvent) {
    return console.info(`[${event.constructor.name}]: Successfully executed`)
  }
}
