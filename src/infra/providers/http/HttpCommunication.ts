export type HttpRequest<Body, Params> = {
  path: string
  body?: Body
  params?: Params
}

export type HttpResponse<Data> = {
  data: Data
}

export type HttpCommunicationSettings = {
  host: string
  headers: { [key: string]: string }
}

export interface HttpCommunication {
  configure(settings: HttpCommunicationSettings): void
  post<Body, Data = any, Params = any>(
    request: HttpRequest<Body, Params>
  ): Promise<HttpResponse<Data>>
  get<Body, Data = any, Params = any>(
    request: HttpRequest<Body, Params>
  ): Promise<HttpResponse<Data>>
}
