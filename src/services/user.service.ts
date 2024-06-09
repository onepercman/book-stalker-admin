import { api } from "@/libs/axios"

export class UserService {
  login(data: LoginDTO) {
    return api.request({
      method: "POST",
      url: "/user/login/admin",
      data,
    })
  }
}
