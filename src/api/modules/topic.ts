import { http } from '@/api/request'
import type { ApiResponse } from '@/api/type'
import type { CommentParams, FollowParams, Topic } from '@/types'

// 话题列表获取
export function getTopic() {
  return http.get<ApiResponse<Topic[]>>('/topic/list')
}

// 关注 or取消关注
export function Follow ( data: FollowParams ) {
  return http.post<ApiResponse>('/topic/follow', data)
}

