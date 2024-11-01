import { UniqueEntityID } from '@/core/UniqueEntityID'
import { DomainEvents } from '@/core/DomainEvents'

const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
  const aggregateId = new UniqueEntityID(model[primaryKeyField])
  DomainEvents.dispatchEventsForAggregate(aggregateId)
}

export const startHooks = async function () {}
