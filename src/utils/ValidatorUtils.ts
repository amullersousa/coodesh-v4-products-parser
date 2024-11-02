import validator from 'validator'

export class ValidatorUtils {
  public static isEmpty(value: any): boolean {
    return validator.isEmpty(value)
  }

  public static isBoolean(value: any): boolean {
    if (typeof value === 'boolean') {
      return true
    } else if (typeof value === 'string') {
      return validator.isBoolean(value)
    }
  }

  public static validateURL(url: string): boolean {
    return validator.isURL(url)
  }
}
