import { http } from '@/api/request'
import type { ApiResponse } from '@/api/type'
import type { Activity, JoinParams,  Recommendations } from '@/types'

// 获取活动接口
export function getActivity(  ){
  return http.get<ApiResponse<Activity[]>>('')
}

// 获取精品推荐接口
export function getRecommend() {
  return http.get<ApiResponse<Recommendations[]>>('')
}

// 参加活动接口
export function joinActivity( params: JoinParams ) {
  return http.post<ApiResponse>('', params)
}