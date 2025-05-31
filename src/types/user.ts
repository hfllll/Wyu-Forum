export interface LoginParams {
  phone: string
  password: string
}

export interface LoginResponse {
  id: string
  token: string
  name: string
  avatar: string
}