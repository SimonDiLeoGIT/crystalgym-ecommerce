export interface PaginationInterface {
  current_page: number
  next_page: number
  ofset: number
  prev_page: number
  total_items: number
  total_pages: number
  has_next: boolean
  has_prev: boolean
}