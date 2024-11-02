import { WatchedList } from '@/core'
import { Product } from './Product'

export class Products extends WatchedList<Product> {
  private constructor(initialSteps: Product[]) {
    super(initialSteps)
  }

  public compareItems(a: Product, b: Product): boolean {
    return a.equals(b)
  }

  public static create(products?: Product[]): Products {
    return new Products(products ? products : [])
  }
}
