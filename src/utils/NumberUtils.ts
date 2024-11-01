export class NumberUtils {
  public static generateRandomInteger(max: number) {
    return Math.floor(Math.random() * max) + 1
  }

  public static generateRandomIntegerInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  public static generateRandomCode(digits: number) {
    const numbers = []
    for (let i = 0; i < digits; i++) {
      numbers.push(NumberUtils.generateRandomIntegerInRange(1, 9))
    }
    return numbers.join('')
  }
}
