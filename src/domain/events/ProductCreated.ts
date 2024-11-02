import { UniqueEntityID, DomainEvent } from '@/core'
import { Product } from '@/domain/entities'

export class ProductCreated implements DomainEvent {
  public dateTimeOccurred: Date
  public product: Product

  constructor(product: Product) {
    this.dateTimeOccurred = new Date()
    this.product = product
  }

  getAggregateId(): UniqueEntityID {
    return this.product.id
  }
}
