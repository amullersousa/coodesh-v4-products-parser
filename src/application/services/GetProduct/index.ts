import { findProductByCodeService } from '@/application/services/FindProductByCode'
import { GetProductService } from './GetProductService'

const getProductService = new GetProductService(findProductByCodeService)

export { getProductService }
