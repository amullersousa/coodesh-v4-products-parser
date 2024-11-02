import { productRepository } from '@/infra/repositories'
import { FindProductByIdService } from './FindProductByIdService'

const findProductByIdService = new FindProductByIdService(productRepository)

export { findProductByIdService }
