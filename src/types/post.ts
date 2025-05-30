import type { PaginationParams } from '@/api/type'

// 定义单个帖子相关类型
export interface Post {
    id: number,
    title: string,
    author: string,
    avatar: string,
    content: string,
    tags: string[],
    likes: number,
    comments: number,
    createdAt: string,
    isLiked?: boolean
}

// 帖子列表请求参数
export interface PostsParams extends PaginationParams {
    keyword?: string,
    tag?: number,
    category?: number,
}
