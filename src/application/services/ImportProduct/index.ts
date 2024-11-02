import { productImportService } from '@/infra/services'
import { checkProductExistsService } from '@/application/services/CheckProductExists'
import { createProductService } from '@/application/services/CreateProduct'
import { updateProductService } from '@/application/services/UpdateProduct'
import { ImportProductService } from './ImportProductService'

const importProductService = new ImportProductService(
  productImportService,
  checkProductExistsService,
  createProductService,
  updateProductService
)

export { importProductService }
