import { ValueObject, Result, Guard } from '@/core'
import { ValidatorUtils } from '@/utils'

export type ProductImageURLProps = {
  value: string
}

export class ProductImageURL extends ValueObject<ProductImageURLProps> {
  private constructor(props: ProductImageURLProps) {
    super(props)
  }

  public static create(url: string): Result<ProductImageURL> {
    const againstNullOrUndefined = Guard.againstNullOrUndefined(url, 'url')
    if (againstNullOrUndefined.isFailure) {
      const errorValue = againstNullOrUndefined.getErrorValue()
      return Result.fail<ProductImageURL>(errorValue)
    }

    const isValidURL = ValidatorUtils.validateURL(url)

    if (!isValidURL) {
      return Result.fail<ProductImageURL>(`The image URL ${url} is not valid.`)
    }

    const value = this.format(url)

    return Result.ok<ProductImageURL>(
      new ProductImageURL({
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
