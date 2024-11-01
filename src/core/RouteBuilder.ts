import { Router } from 'express'

export abstract class RouteBuilder {
  constructor(private path: string) {}

  public build(): Router {
    const rootRouter: Router = Router()
    rootRouter.use(this.path, this.routes())
    return rootRouter
  }

  protected abstract routes(): Router
}
