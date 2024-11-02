import { ProductPayload } from '@/application/payloads'
import { Result } from '@/core'

export interface ProductImportService {
  getDelta(): Promise<Result<Array<string>>>
  getProducts(filename: string, maxItems: number): Promise<Result<Array<ProductPayload>>>
}
