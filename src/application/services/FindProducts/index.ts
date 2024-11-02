import { FindProductsService } from './FindProductsService'
import { productsRepository } from '@/infra/repositories'

const findProductsService = new FindProductsService(productsRepository)

export { findProductsService }
