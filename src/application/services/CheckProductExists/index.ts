import { productRepository } from '@/infra/repositories'
import { CheckProductExistsService } from './CheckProductExistsService'

const checkProductExistsService = new CheckProductExistsService(productRepository)

export { checkProductExistsService }
