import { api } from "@/libs/axios"

export class UserService {
  login(data: LoginDTO) {
    return api.request({
      method: "POST",
      url: "/user/login/admin",
      data,
    })
  }

  list(params?: PaginationArgs) {
    return api.request<Paginated<User>>({
      method: "GET",
      url: "/user",
      params,
      headers: { Authorization: true },
    })
  }

  assignAdmin(data: { id: string; isAdmin: boolean }) {
    return api.request<User>({
      method: "POST",
      url: "/user/assign-admin",
      data,
      headers: { Authorization: true },
    })
  }

  delete(id: string) {
    return api.request<Book>({
      method: "DELETE",
      url: `/user/${id}`,
      headers: { Authorization: true },
    })
  }
}
