import { Service } from "@/services/app.service"

export class UserModel {
  user?: User
  jwt?: string

  async login(dto: LoginDTO) {
    const res = await Service.admin.login(dto)
    if (res.data) {
      this.user = res.data.user
      this.jwt = res.data.jwt
    } else {
      this.logout()
    }
    return res
  }

  logout() {
    this.user = undefined
  }
}
