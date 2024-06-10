import { api } from "@/libs/axios"

export class CategoryService {
  list() {
    return api.request<Category[]>({
      method: "GET",
      url: "/category",
    })
  }

  create(data: Category) {
    return api.request<Category>({
      method: "POST",
      url: "/category",
      data,
      headers: { Authorization: true },
    })
  }

  edit(id: string, data: Category) {
    return api.request<Category>({
      method: "PATCH",
      url: `/category/${id}`,
      data,
      headers: { Authorization: true },
    })
  }

  delete(id: string) {
    return api.request<Category>({
      method: "DELETE",
      url: `/category/${id}`,
      headers: { Authorization: true },
    })
  }
}
