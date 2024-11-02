import { findProductByCodeService } from '@/application/services/FindProductByCode'
import { saveProductService } from '@/application/services/SaveProduct'
import { DeleteProductService } from './DeleteProductService'

const deleteProductService = new DeleteProductService(
  findProductByCodeService,
  saveProductService
)

export { deleteProductService }
