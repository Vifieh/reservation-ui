import {Role} from "../../enum/role";

export interface LoginDto {
  accessToken: string
  email: string
  id: string
  expiredIn: Date
  refreshToken: string
  role: Role[]
  type: string
}
