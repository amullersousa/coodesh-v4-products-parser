import { ValueObject, Result, Guard } from '@/core'

export type ProductCodeProps = {
  value: string
}

export class ProductCode extends ValueObject<ProductCodeProps> {
  private constructor(props: ProductCodeProps) {
    super(props)
  }

  public static create(url: string): Result<ProductCode> {
    const againstNullOrUndefined = Guard.againstNullOrUndefined(url, 'url')
    if (againstNullOrUndefined.isFailure) {
      const errorValue = againstNullOrUndefined.getErrorValue()
      return Result.fail<ProductCode>(errorValue)
    }

    const value = this.format(url)

    return Result.ok<ProductCode>(
      new ProductCode({
        value
      })
    )
  }

  private static format(url: string): string {
    return url.trim().replace(/\D/g, '')
  }

  get value(): string {
    return this.props.value
  }
}
