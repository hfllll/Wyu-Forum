import { http } from '@/api/request'
import type { ApiResponse } from '@/api/type'
import type {  FollowParams, PostsParams, Topic, TopicParams } from '@/types'

// 话题列表获取
export function getTopic(params?: TopicParams) {
  return http.get<ApiResponse<Topic[]>>('/topic/list', { params })
}

// 关注 or取消关注
export function Follow ( data: FollowParams ) {
  return http.post<ApiResponse>('/topic/follow', data)
}

