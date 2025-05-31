import { http } from '@/api/request'

import type { Post, PostsParams, PostCategory, TrendingTopic } from '@/types/post'
import type { ApiResponse,  PaginationResponse,  } from '@/api/type'

// 获取帖子列表
export function getPostList(data: PostsParams) {
    return http.post<ApiResponse<PaginationResponse<Post>>>('/post/list',  data )
}

// 获取左侧分类
export function getPostCategory(){
    return http.get<ApiResponse<PostCategory[]>>('/post/label/list')
}

// 获取左侧分类
export function getTrendingTopic(){
    return http.get<ApiResponse<TrendingTopic[]>>('/post/topic/list')
}

// 点赞函数姐