import { saveProductService } from '@/application/services/SaveProduct'
import { checkProductExistsService } from '@/application/services/CheckProductExists'
import { findProductByCodeService } from '@/application/services/FindProductByCode'
import { UpdateProductService } from './UpdateProductService'

const updateProductService = new UpdateProductService(
  checkProductExistsService,
  findProductByCodeService,
  saveProductService
)

export { updateProductService }
