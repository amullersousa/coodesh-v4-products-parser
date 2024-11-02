import { findProductsService } from '@/application/services/FindProducts'
import { GetProductsService } from './GetProductsService'

const getProductsService = new GetProductsService(findProductsService)

export { getProductsService }
