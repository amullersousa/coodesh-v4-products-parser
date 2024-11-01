import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
const { window } = new JSDOM('<!DOCTYPE html>')
const domPurify = DOMPurify(window)

export class TextUtils {
  public static sanitize(unsafeText: string): string {
    return domPurify.sanitize(unsafeText)
  }

  public static createRandomCharCode(numberDigits: number): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
    let token = ''

    for (let i = numberDigits; i > 0; --i) {
      token += chars[Math.round(Math.random() * (chars.length - 1))]
    }

    return token.toUpperCase()
  }
}
