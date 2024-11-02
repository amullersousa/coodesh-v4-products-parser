import { NextFunction, Request, Response } from 'express'
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit'
import config from '@/config'
import { ErrorTypes } from '@/core'
import { Middleware } from '@/core/Middleware'

export class AuthorizationMiddleware extends Middleware {
  public ensureApiKey() {
    return async (request: Request, response: Response, next: NextFunction) => {
      const apiKey = request.headers['api_key']

      if (apiKey) {
        // @TODO aplicar demais validações
        return next()
      }

      return this.fail(response, {
        type: ErrorTypes.Forbidden,
        message: 'API KEY not provided',
        code: 'API_KEY_NOT_PROVIDED'
      })
    }
  }

  public static createRateLimit(
    mins: number,
    maxRequests: number
  ): RateLimitRequestHandler {
    return rateLimit({
      windowMs: mins * 60 * 1000,
      max: maxRequests
    })
  }

  public static restrictedUrl(
    request: Request,
    response: Response,
    next: NextFunction
  ): unknown {
    const isProduction = false

    if (isProduction) {
      const allowedDomains = config.server.allowedOrigins.split(';')
      const domain = request.headers.origin

      const allowedDomain = allowedDomains.find(ad => {
        return ad === domain
      })

      if (!allowedDomain) {
        return next()
      }

      return response.status(401).json({
        type: 'Unauthorized',
        message: 'Unauthorized access'
      })
    }

    return next()
  }
}
