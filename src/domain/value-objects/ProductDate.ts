import { ValueObject, Result, Guard } from '@/core'

export type ProductDateProps = {
  value: Date
}

export class ProductDate extends ValueObject<ProductDateProps> {
  private constructor(props: ProductDateProps) {
    super(props)
  }

  public static create(date?: number | Date): Result<ProductDate> {
    const againstNullOrUndefined = Guard.againstNullOrUndefined(date, 'date')
    if (againstNullOrUndefined.isFailure) {
      const errorValue = againstNullOrUndefined.getErrorValue()
      return Result.fail<ProductDate>(errorValue)
    }

    let value

    if (date) {
      if (typeof date === 'number') {
        value = this.format(date)
      }
    } else {
      value = new Date()
    }

    return Result.ok<ProductDate>(
      new ProductDate({
        value
      })
    )
  }

  private static format(date: number): Date {
    return new Date(date * 1000)
  }

  get value(): Date {
    return this.props.value
  }
}
