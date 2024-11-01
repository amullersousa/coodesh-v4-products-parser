import { Request, Response, NextFunction } from 'express'

export type ThirdPartyMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => unknown

export abstract class ThirdPartyBuilder {
  abstract middlewares(): Array<
    ThirdPartyMiddleware
  >
}
