import { EventHandle } from "./EventHandle"

export abstract class EventSubscription {
  public abstract subscriptions(): EventHandle[]
}
