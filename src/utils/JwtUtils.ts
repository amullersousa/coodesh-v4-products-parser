import * as jwt from 'jsonwebtoken'
import config from '@/config'

export type JWTToken = string
export type JWTRefreshToken = string

export class JwtUtils {
  public static encode<T>(claims: T): string {
    return jwt.sign(claims, config.jwt.secret, {
      expiresIn: config.jwt.tokenExpiryTime
    })
  }

  public static decode<T>(token: string): Promise<T> {
    return new Promise(resolve => {
      jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
          return resolve(null)
        }
        return resolve(decoded)
      })
    })
  }

  public static createRefreshToken<T>(claims: T): string {
    return jwt.sign(claims, config.jwt.secret, {
      expiresIn: config.jwt.refresTokenExpiryTime
    })
  }

  public static compare(tokenA: JWTToken, tokenB: JWTToken): boolean {
    return tokenA === tokenB
  }
}
