import { http } from '@/api/request'
import type { ApiResponse } from '@/api/type'
import type { LoginParams, LoginResponse, ProfileParams, UserProfile, SaveProfileParams, UploadAvatarParams, UserInfo } from '@/types'

// 登录接口
export function goLogin(data: LoginParams) {
  return http.post<ApiResponse<LoginResponse>>('/user/login', data )
}

// 获取个人信息接口
export function getProfile( params:ProfileParams ) {
  return http.get<ApiResponse<UserProfile>>('/user/info', { params })
}

// 更新个人信息接口
export function updateProfile(data: SaveProfileParams) {
  return http.post<ApiResponse<UserInfo>>('/user/update', data)
}

// 上传头像接口
export function uploadAvatar(data: UploadAvatarParams) {
  return http.post<ApiResponse<string>>('/oss/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
