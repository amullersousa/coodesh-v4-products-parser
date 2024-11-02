import { saveProductService } from '@/application/services/SaveProduct'
import { checkProductExistsService } from '@/application/services/CheckProductExists'
import { CreateProductService } from './CreateProductService'

const createProductService = new CreateProductService(
  checkProductExistsService,
  saveProductService
)

export { createProductService }
