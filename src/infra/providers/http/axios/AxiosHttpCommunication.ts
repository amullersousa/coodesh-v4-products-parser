import axios from 'axios'
import {
  HttpCommunication,
  HttpCommunicationSettings,
  HttpRequest,
  HttpResponse
} from '@/infra/providers/http/HttpCommunication'

export class AxiosHttpCommunication implements HttpCommunication {
  private settings: HttpCommunicationSettings

  configure(settings: HttpCommunicationSettings): void {
    this.settings = settings
  }

  async post<Body, Data = any, Params = any>(
    request: HttpRequest<Body, Params>
  ): Promise<HttpResponse<Data>> {
    try {
      const axiosInstance = axios.create({
        baseURL: this.settings.host,
        headers: this.settings.headers
      })

      return await axiosInstance.post(request.path, request.body, {
        params: request.params
      })
    } catch (error) {
      if (error.response) {
        throw error.response.data
      }
      throw {
        message: 'An unexpected error occurred',
        type: 'InternalServerError',
        code: 'UNEXPECTED'
      }
    }
  }

  async get<Body, Data = any, Params = any>(
    request: HttpRequest<Body, Params>
  ): Promise<HttpResponse<Data>> {
    try {
      const axiosInstance = axios.create({
        baseURL: this.settings.host,
        headers: this.settings.headers
      })

      return await axiosInstance.get(request.path, {
        params: request.params
      })
    } catch (error) {
      if (error.response) {
        throw error.response.data
      }
      throw {
        message: 'An unexpected error occurred',
        type: 'InternalServerError',
        code: 'UNEXPECTED'
      }
    }
  }
}
