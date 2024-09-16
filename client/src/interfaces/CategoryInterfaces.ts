import { PaginationInterface } from "./Pagination"

export interface CategoryInterface {
  code: number
  data: CategoryDataInterface[]
  message: string
}

export interface CategoryDataInterface {
  id: number
  name: string
}

export interface PaginatedCategoriesInterface {
  code: number
  data: {
    categories: CategoryDataInterface[]
    pagination: PaginationInterface
  }
  message: string
}