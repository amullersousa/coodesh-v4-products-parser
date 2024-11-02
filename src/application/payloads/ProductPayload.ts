export interface ProductPayload {
  code: string
  url: string
  creator: string
  created_t: number // timestamp
  last_modified_t: number // timestamp
  product_name: string
  quantity: string
  brands: string
  categories: string
  labels: string
  cities: string
  purchase_places: string
  stores: string
  ingredients_text: string
  traces: string
  serving_size: string
  serving_quantity: number
  nutriscore_score: number
  nutriscore_grade: string
  main_category: string
  image_url: string
}
