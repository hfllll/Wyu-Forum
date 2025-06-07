import { http } from '@/api/request'
import type { ApiResponse } from '@/api/type'
import type { LoginParams, LoginResponse, ProfileParams, UserProfile } from '@/types'

// 登录接口
export function goLogin(data: LoginParams) {
  return http.post<ApiResponse<LoginResponse>>('/user/login', data )
}

// 获取个人信息接口
export function getProfile( params:ProfileParams ) {
  return http.get<ApiResponse<UserProfile>>('/user/info', { params })
}