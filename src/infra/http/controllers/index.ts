import { getProductService } from '@/application/services/GetProduct'
import { getProductsService } from '@/application/services/GetProducts'
import { deleteProductService } from '@/application/services/DeleteProduct'
import { updateProductService } from '@/application/services/UpdateProduct'
import { getAppInfoService } from '@/application/services/GetAppInfo'

import { GetProductController } from './GetProductController'
import { GetProductsController } from './GetProductsController'
import { DeleteProductController } from './DeleteProductController'
import { UpdateProductController } from './UpdateProductController'
import { GetAppInfoController } from './GetAppInfoController'

const getProductController = new GetProductController(getProductService)
const getProductsController = new GetProductsController(getProductsService)
const deleteProductController = new DeleteProductController(deleteProductService)
const updateProductController = new UpdateProductController(updateProductService)
const getAppInfoController = new GetAppInfoController(getAppInfoService)

export {
  getProductController,
  getProductsController,
  deleteProductController,
  updateProductController,
  getAppInfoController
}
