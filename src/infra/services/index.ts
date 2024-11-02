import httpCommunication from '@/infra/providers/http'
import config from '@/config'
import { FoodFactsProductImportService } from './implementation/FoodFactsProductImportService'

httpCommunication.configure({
  baseURL: config.importer.basePath,
  headers: {}
})

const productImportService = new FoodFactsProductImportService(httpCommunication)

export { productImportService }
