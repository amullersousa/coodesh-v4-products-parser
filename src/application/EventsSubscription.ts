import { EventHandle, EventSubscription } from '@/core'

export class EventsSubscription extends EventSubscription {
  private childsEventsSubscriptions: Array<EventSubscription> = []

  public subscriptions(): EventHandle[] {
    return this.childsEventsSubscriptions.flatMap(eventsSubscription => {
      return eventsSubscription.subscriptions()
    })
  }
}
