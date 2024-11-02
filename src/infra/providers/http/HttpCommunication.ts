import { CreateAxiosDefaults } from 'axios'

export type HttpRequest<Body, Params> = {
  path: string
  body?: Body
  params?: Params
}

export type HttpResponse<Data> = {
  data: Data
}

export type HttpCommunicationSettings = CreateAxiosDefaults

export interface HttpCommunication {
  configure(settings: HttpCommunicationSettings): void
  post<Body, Data = any, Params = any>(
    request: HttpRequest<Body, Params>,
    settings?: HttpCommunicationSettings
  ): Promise<HttpResponse<Data>>
  get<Body, Data = any, Params = any>(
    request: HttpRequest<Body, Params>,
    settings?: HttpCommunicationSettings
  ): Promise<HttpResponse<Data>>
}
