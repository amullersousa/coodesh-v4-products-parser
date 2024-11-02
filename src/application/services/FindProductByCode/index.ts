import { productRepository } from '@/infra/repositories'
import { FindProductByCodeService } from './FindProductByCodeService'

const findProductByCodeService = new FindProductByCodeService(productRepository)

export { findProductByCodeService }
