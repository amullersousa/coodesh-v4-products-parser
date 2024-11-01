import { Result } from './Result'

export type GuardResponse = string

export class Guard {
  public static againstNullOrUndefined(value: any, name: string): Result<GuardResponse> {
    if (value === null || value === undefined) {
      return Result.fail<GuardResponse>(`${name} is null or undefined`)
    }
    return Result.ok<GuardResponse>()
  }

  public static againstNullOrUndefinedBulk(
    args: { value: any; name: string }[]
  ): Result<GuardResponse> {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(arg.value, arg.name)
      if (result.isFailure) {
        return result
      }
    }

    return Result.ok<GuardResponse>()
  }

  public static againstAtLeast(numChars: number, text: string): Result<GuardResponse> {
    if (text.length < numChars) {
      return Result.fail<GuardResponse>(`Text is not at least ${numChars} chars.`)
    }
    return Result.ok<GuardResponse>()
  }

  public static againstAtMost(numChars: number, text: string): Result<GuardResponse> {
    if (text.length > numChars) {
      return Result.fail<GuardResponse>(`Text is greater than ${numChars} chars.`)
    }
    return Result.ok<GuardResponse>()
  }
}
