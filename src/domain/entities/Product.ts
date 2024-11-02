import { Result, Guard, AggregateRoot, UniqueEntityID } from '@/core'
import { ProductCreated } from '@/domain/events'
import { ProductID } from './ProductID'
import {
  ProductImageURL,
  ProductURL,
  ProductCode,
  ProductDate
} from '@/domain/value-objects'

export enum ProductStatus {
  PUBLISHED = 'published',
  TRASH = 'trash',
  DRAFT = 'draft'
}

export type ProductProps = {
  code: ProductCode
  importedAt: ProductDate
  status: ProductStatus
  URL?: ProductURL
  imageURL?: ProductImageURL
  createdAt?: ProductDate
  lastModifiedAt?: ProductDate
  creator?: string
  productName?: string
  quantity?: string
  brands?: string
  categories?: string
  labels?: string
  cities?: string
  purchasePlaces?: string
  stores?: string
  ingredientsText?: string
  traces?: string
  servingSize?: string
  servingQuantity?: number
  nutriscoreScore?: number
  nutriscoreGrade?: string
  mainCategory?: string
}

export class Product extends AggregateRoot<ProductProps> {
  constructor(props: ProductProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(props: ProductProps, id?: UniqueEntityID): Result<Product> {
    const nullOrUndefinedGuard = Guard.againstNullOrUndefinedBulk([
      { value: props.code, name: 'code' },
      { value: props.status, name: 'status' },
      { value: props.importedAt, name: 'importedAt' }
    ])

    if (nullOrUndefinedGuard.isFailure) {
      return Result.fail<Product>(nullOrUndefinedGuard.getErrorValue())
    }

    const product = new Product(props, id)
    const newProduct = !id

    if (newProduct) {
      product.addDomainEvent(new ProductCreated(product))
    }

    return Result.ok<Product>(product)
  }

  public update(
    props: Omit<ProductProps, 'code' | 'importedAt' | 'createdAt' | 'status'>
  ): Result<void> {
    try {
      const propKeys = Object.keys(this.props)

      for (const propKey in propKeys) {
        if (props[propKey]) {
          this.props[propKey] = props[propKey]
        }
      }

      return Result.ok()
    } catch (error) {
      return Result.fail(error)
    }
  }

  public delete(): void {
    this.props.status = ProductStatus.TRASH
  }

  get productId(): ProductID {
    return ProductID.create(this._id).getValue()
  }

  get code(): ProductCode {
    return this.props.code
  }

  get status(): ProductStatus {
    return this.props.status
  }

  get importedAt(): ProductDate {
    return this.props.importedAt
  }

  get URL(): ProductURL {
    return this.props.URL
  }

  get creator(): string {
    return this.props.creator
  }

  get createdAt(): ProductDate {
    return this.props.createdAt
  }

  get lastModifiedAt(): ProductDate {
    return this.props.lastModifiedAt
  }

  get productName(): string {
    return this.props.productName
  }

  get quantity(): string {
    return this.props.quantity
  }

  get brands(): string {
    return this.props.brands
  }

  get categories(): string {
    return this.props.categories
  }

  get labels(): string {
    return this.props.labels
  }

  get cities(): string {
    return this.props.cities
  }

  get purchasePlaces(): string {
    return this.props.purchasePlaces
  }

  get stores(): string {
    return this.props.stores
  }

  get ingredientsText(): string {
    return this.props.ingredientsText
  }

  get traces(): string {
    return this.props.traces
  }

  get servingSize(): string {
    return this.props.servingSize
  }

  get servingQuantity(): number {
    return this.props.servingQuantity
  }

  get nutriscoreScore(): number {
    return this.props.nutriscoreScore
  }

  get nutriscoreGrade(): string {
    return this.props.nutriscoreGrade
  }

  get mainCategory(): string {
    return this.props.mainCategory
  }

  get imageURL(): ProductImageURL {
    return this.props.imageURL
  }
}
