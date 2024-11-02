import fs from 'fs'
import path from 'path'
import zlib from 'zlib'
import JSONStream from 'JSONStream'
import config from '@/config'
import { Result } from '@/core'
import { HttpCommunication } from '@/infra/providers/http/HttpCommunication'
import { getLogger } from '@/infra/providers/logger'
import { ProductImportService } from '@/infra/services/ProductImportService'
import { ProductPayload } from '@/application/payloads'

export class FoodFactsProductImportService implements ProductImportService {
  constructor(private foodFacts: HttpCommunication) {}

  private async download(filename: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const response = await this.foodFacts.get<unknown, NodeJS.ReadableStream>(
        {
          path: filename
        },
        {
          responseType: 'stream'
        }
      )

      response.data
        .pipe(fs.createWriteStream(path.resolve(config.importer.outputPath, filename)))
        .on('finish', resolve)
        .on('error', reject)
    })
  }

  private async extractFileItems(
    filename: string,
    maxItems: number
  ): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      try {
        const items = []

        const inputStream = fs
          .createReadStream(path.resolve(config.importer.outputPath, filename))
          .pipe(zlib.createGunzip())

        const jsonStream = inputStream.pipe(JSONStream.parse())

        jsonStream.on('data', data => {
          items.push(data)

          if (items.length >= maxItems) {
            jsonStream.end()
          }
        })

        jsonStream.on('end', () => {
          resolve(items)
        })

        jsonStream.on('error', error => {
          reject(error)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async getDelta(): Promise<Result<Array<string>>> {
    const logger = getLogger({
      controller: 'FoodFactsProductImportService',
      method: 'getDelta'
    })

    try {
      const response = await this.foodFacts.get<unknown, string>({
        path: 'index.txt'
      })

      const result = response.data.trim().split('\n')

      return Result.ok(result)
    } catch (error) {
      logger.error(error)
      return Result.fail('An error occurred while retrieving the file list')
    }
  }

  async getProducts(
    filename: string,
    maxItems: number
  ): Promise<Result<Array<ProductPayload>>> {
    const logger = getLogger({
      controller: 'FoodFactsProductImportService',
      method: 'getItems'
    })

    try {
      await this.download(filename)
      const items = await this.extractFileItems(filename, maxItems)

      return Result.ok(items)
    } catch (error) {
      logger.error(error)
      return Result.fail('An error occurred while retrieving the file')
    }
  }
}
