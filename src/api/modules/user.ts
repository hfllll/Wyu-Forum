import { http } from '@/api/request'
import type { ApiResponse } from '@/api/type'
import type { LoginParams, LoginResponse } from '@/types'

// 登录接口
export function goLogin(data: LoginParams) {
  return http.post<ApiResponse<LoginResponse>>('/user/login', data )
}