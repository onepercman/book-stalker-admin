import { api } from "@/libs/axios"

export class BookService {
  list(params?: PaginationArgs & { categoryId?: string }) {
    return api.request<Paginated<Book>>({
      method: "GET",
      url: "/book",
      params,
    })
  }
}
