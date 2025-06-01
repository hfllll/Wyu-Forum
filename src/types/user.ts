export  interface UserInfo {
  id: string
  name: string
  avatar: string
  token:string
}

export interface LoginParams {
  phone: string
  password: string
}

export interface LoginResponse extends UserInfo {
  
}
