import database from '@/infra/providers/database'
import { SequelizeProductRepository } from './implementation/SequelizeProductRepository'
import { SequelizeProductsRepository } from './implementation/SequelizeProductsRepository'

const productRepository = new SequelizeProductRepository(database)
const productsRepository = new SequelizeProductsRepository(database)

export { productRepository, productsRepository }
