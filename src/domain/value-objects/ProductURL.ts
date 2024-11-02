import { ValueObject, Result, Guard } from '@/core'
import { ValidatorUtils } from '@/utils'

export type ProductURLProps = {
  value: string
}

export class ProductURL extends ValueObject<ProductURLProps> {
  private constructor(props: ProductURLProps) {
    super(props)
  }

  public static create(url: string): Result<ProductURL> {
    const againstNullOrUndefined = Guard.againstNullOrUndefined(url, 'url')
    if (againstNullOrUndefined.isFailure) {
      const errorValue = againstNullOrUndefined.getErrorValue()
      return Result.fail<ProductURL>(errorValue)
    }

    const isValidURL = ValidatorUtils.validateURL(url)

    if (!isValidURL) {
      return Result.fail<ProductURL>(`The URL ${url} is not valid`)
    }

    const value = this.format(url)

    return Result.ok<ProductURL>(
      new ProductURL({
        value
      })
    )
  }

  private static format(url: string): string {
    return url.trim().toLocaleLowerCase()
  }

  get value(): string {
    return this.props.value
  }
}
