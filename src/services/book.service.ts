import { api } from "@/libs/axios"

export class BookService {
  list(params?: PaginationArgs & { categoryId?: string }) {
    return api.request<Paginated<Book>>({
      method: "GET",
      url: "/book",
      params,
    })
  }

  create(data: Book) {
    return api.request<Book>({
      method: "POST",
      url: "/book",
      data,
      headers: { Authorization: true },
    })
  }

  edit(id: string, data: Book) {
    return api.request<Book>({
      method: "PATCH",
      url: `/book/${id}`,
      data,
      headers: { Authorization: true },
    })
  }

  delete(id: string) {
    return api.request<Book>({
      method: "DELETE",
      url: `/book/${id}`,
      headers: { Authorization: true },
    })
  }

  upload(file: File) {
    return api.postForm<string>(
      "/book/upload",
      { file },
      {
        headers: { "Content-Type": "multipart/form-data", Authorization: true },
      },
    )
  }
}
