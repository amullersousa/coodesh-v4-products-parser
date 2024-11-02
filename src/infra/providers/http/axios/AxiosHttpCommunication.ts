import axios from 'axios'
import {
  HttpCommunication,
  HttpCommunicationSettings,
  HttpRequest,
  HttpResponse
} from '@/infra/providers/http/HttpCommunication'
import { ObjectUtils } from '@/utils'

export class AxiosHttpCommunication implements HttpCommunication {
  private settings: HttpCommunicationSettings

  configure(settings: HttpCommunicationSettings): void {
    this.settings = settings
  }

  async post<Body, Data = any, Params = any>(
    request: HttpRequest<Body, Params>,
    settings?: HttpCommunicationSettings
  ): Promise<HttpResponse<Data>> {
    try {
      const axiosInstance = axios.create(ObjectUtils.merge(this.settings, settings))

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
    request: HttpRequest<Body, Params>,
    settings?: HttpCommunicationSettings
  ): Promise<HttpResponse<Data>> {
    try {
      const axiosInstance = axios.create(ObjectUtils.merge(this.settings, settings))

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
