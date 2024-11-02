import { Result, Entity, UniqueEntityID } from '@/core'

export class ProductID extends Entity<string | number> {
  private constructor(id?: UniqueEntityID) {
    super(null, id)
  }

  public static create(id?: UniqueEntityID): Result<ProductID> {
    return Result.ok<ProductID>(new ProductID(id))
  }

  get id(): UniqueEntityID {
    return this._id
  }
}
