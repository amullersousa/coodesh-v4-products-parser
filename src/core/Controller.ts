import { Response, Request } from 'express'
import { HttpErrorCode } from './HttpErrorCode'
import { ServerError } from './Error'

/**
 * An abstract base class for handling HTTP requests in an Express.js application.
 * Provides utility methods for standard responses and error handling.
 */
export abstract class Controller {
  /**
   * The main handler function that must be implemented by subclasses to process the incoming request.
   *
   * @param {Request} request - The incoming HTTP request object.
   * @param {Response} response - The outgoing HTTP response object.
   *
   * @returns {Promise<void | any>} A promise that resolves to void or any result to be sent as the response.
   */
  protected abstract handle(request: Request, response: Response): Promise<void | any>

  /**
   * Executes the request handler and catches any errors, passing them to the fail method.
   *
   * @param {Request} request - The incoming HTTP request object.
   * @param {Response} response - The outgoing HTTP response object.
   *
   * @returns {Promise<void>} A promise that resolves when the request handling is complete.
   */
  execute = async (request: Request, response: Response): Promise<void> => {
    try {
      return this.handle(request, response)
    } catch (error) {
      return this.fail(response)
    }
  }

  /**
   * Sends a successful HTTP 200 response with an optional data transfer object (DTO).
   *
   * @template T - The type of the DTO.
   *
   * @param {Response} response - The outgoing HTTP response object.
   * @param {T} [dto] - An optional data transfer object to be sent in the response body.
   *
   * @returns {any} The response object with a JSON body.
   *
   * Example:
   *
   * ```typescript
   * this.ok(response, { message: 'Success' });
   * ```
   */
  public ok<T>(response: Response, dto?: T): any {
    return response.status(200).json(dto || {})
  }

  /**
   * Sends a failure response based on a server error or a generic internal server error.
   *
   * @param {Response} response - The outgoing HTTP response object.
   * @param {ServerError} [error] - An optional server error object that provides details about the failure.
   *
   * Example:
   *
   * ```typescript
   * this.fail(response, new ServerError('NotFoundError', 'Resource not found', 'NOT_FOUND'));
   * ```
   */
  public fail(response: Response, error?: ServerError): void {
    if (error) {
      const status = HttpErrorCode[error.type as string]

      if (status) {
        response.status(status).json({
          type: error.type,
          message: error.message,
          code: error.code
        })
      }
    } else {
      response.status(HttpErrorCode.InternalServerError).json({
        message:
          'O servidor não está respondendo. Por favor, aguarde alguns instantes e tente novamente.',
        type: 'InternalServerError',
        code: 'UNEXPECTED'
      })
    }
  }

  /**
   * Redirects the client to a specified path with an HTTP 302 status.
   *
   * @param {Response} response - The outgoing HTTP response object.
   * @param {string} path - The path to redirect the client to.
   *
   * @returns {any} The response object with a redirect.
   *
   * Example:
   *
   * ```typescript
   * this.redirect(response, '/login');
   * ```
   */
  public redirect(response: Response, path: string): any {
    return response.status(HttpErrorCode.Redirect).redirect(path)
  }
}
