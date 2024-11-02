import { productRepository } from '@/infra/repositories'
import { SaveProductService } from './SaveProductService'

const saveProductService = new SaveProductService(productRepository)

export { saveProductService }
