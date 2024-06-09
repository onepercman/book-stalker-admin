import { api } from "@/libs/axios"

export class CategoryService {
  list() {
    return api.request<Category[]>({
      method: "GET",
      url: "/category",
    })
  }
}
