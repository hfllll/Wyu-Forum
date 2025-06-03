import { http } from '@/api/request'

import type { Post, PostsParams, PostCategory, TrendingTopic, LikeParams, PostDetailParams, PostDetail, CommentParams, FatherComment, FollowAuthor, CollectParams } from '@/types'
import type { ApiResponse,  PaginationResponse,  } from '@/api/type'

// 获取帖子列表
export function getPostList(data: PostsParams) {
    return http.post<ApiResponse<PaginationResponse<Post>>>('/forum/post/list',  data )
}

// 获取左侧分类
export function getPostCategory(){
    return http.get<ApiResponse<PostCategory[]>>('/forum/post/label/list')
}

// 获取左侧分类
export function getTrendingTopic(){
    return http.get<ApiResponse<TrendingTopic[]>>('/forum/post/topic/list')
}

// 点赞
export function Like( data: LikeParams ) {
    return http.post<ApiResponse>('/user/like', data )
}

// 获取帖子详情
export function getPostDetail( params: PostDetailParams ) {
    return http.get<ApiResponse<PostDetail>>('', { params })
}

// 获取评论列表
export function getComment( params: CommentParams ) {
    return http.get<ApiResponse<FatherComment[]>>('', { params })
}

// 关注帖子编者的接口
export function followAuthor( data: FollowAuthor ){
    return http.post<ApiResponse>('', data)
}

// 评论帖子的接口
export function Comment(data: CommentParams) {
    return http.post<ApiResponse>('', data)
}

// 收藏帖子的接口
export function Collect(params: CollectParams) {
    return http.post<ApiResponse>('', { params })
}