import { api } from "@/libs/axios"

export class AdminService {
  login(data: LoginDTO) {
    return api.request({
      method: "POST",
      url: "/admin/login",
      data,
    })
  }
}
