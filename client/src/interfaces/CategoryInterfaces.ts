export interface CategoryInterface {
  code: number
  data: CategoryDataInterface[]
  message: string
}

export interface CategoryDataInterface {
  id: number
  name: string
}