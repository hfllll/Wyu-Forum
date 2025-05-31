import type { PaginationParams } from '@/api/type'

// 定义单个帖子相关类型
export interface Post {
    id: string,
    title: string,
    authorId: string,
    authorName: string,
    avatar: string,
    content: string,
    tags: string[],
    likes: number,
    comments: number,
    createdAt: string,
    isLiked?: boolean,
    images: string,
    looks: number
}

// 帖子列表请求参数
export interface PostsParams extends PaginationParams {
    keyword?: string,
    tag?: string,
}


// 左侧tab的单个分类板块
export interface PostCategory {
    num: string,
    title: string,
    categoryId: string
}


// 左侧tab的单个热门话题
export interface TrendingTopic {
    title: string,
    topicId: string
}


// 分页器数据相关
export interface PaginationData {
    current: number,
    pages: number,
    size: number,
    total: number
}