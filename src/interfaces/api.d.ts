interface Paginated<T> {
  data: T[]
  count: number
}

interface PaginationArgs {
  page?: number
  take?: number
  sortType?: "ASC" | "DESC"
  search?: string
}
