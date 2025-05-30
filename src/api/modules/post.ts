import { http } from '@/api/request'

import type { Post, PostsParams } from '@/types/post'
import type { ApiResponse,  PaginationResponse } from '@/api/type'

// 获取帖子列表
export function getPostList(params: PostsParams) {
    return http.get<ApiResponse<PaginationResponse<Post>>>('/forum/post/list', { params })
}