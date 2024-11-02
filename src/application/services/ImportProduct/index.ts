import { saveProductService } from '@/application/services/SaveProduct'
import { productImportService } from '@/infra/services'
import { checkProductExistsService } from '@/application/services/CheckProductExists'
import { ImportProductService } from './ImportProductService'

const importProductService = new ImportProductService(
  productImportService,
  checkProductExistsService,
  saveProductService
)

export { importProductService }
