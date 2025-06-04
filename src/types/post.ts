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
    num?: string,
    title?: string,
    categoryId?: string
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


// 点赞接口请求参数
export interface LikeParams {
    postId: string // 帖子ID
    likeOrUnlike: number  // 1为关注 0为取消关注
}

// 帖子详情内容的请求参数
export interface PostDetailParams {
    postId: string
}

// 详情帖子数据 包括请求响应
export interface PostDetail {
    postData: PostData
    authorData: Author // 作者信息
    relatedPosts: RelatedPosts[] // 相关帖子
}

// 帖子内容
export interface PostData {
    id: string, // 帖子ID
    title: string,
    content: string, // 内容 后续可能升级富文本
    tags: string[], // 标签
    likes: number, // 点赞数量
    isCollected?: boolean // 是否收藏
    views: number, // 观看数量
    createdAt: string // 发帖时间
    comments: number // 帖子数量
    author: string
    avatar: string
    authorID: string
}

// 帖子详情的推荐帖子数据
export interface RelatedPosts {
    postId: string
    title: string
}

// 帖子作者信息
export interface Author {
    author: string,
    avatar: string,
    postNum: number // 帖子数量
    likeNum: number // 获赞数量
    fansNUm: number // 粉丝数量
    authorID: string
    isFollowd?: boolean // 作者是否被我关注了 如果是查看本人的帖子 该值不返回
}

// 子评论
export interface SonComment {
    id: string
    userId: string,
    avatar: string,
    author: string
    content: string
    likes: number,
    count: null | number,
    commentCounts: number,
    createTime: string
}

// 父评论
export interface FatherComment {
    id: string, // 评论id
    userId: string  // 用户ID
    author: string,
    avatar: string, // 头像
    content: string,
    likes: number,
    createTime: string,
    commentCounts: number,
    commentList: SonComment[]
}


// 帖子详情页关注作者的接口
export interface FollowAuthor {
    authorId: string
    toFollow: boolean // true为关注 false为取消关注
}

// 评论帖子的接口
export interface CommentParams {
    parentId: string // 如果一级评论为postId 二级为父Id
    commentContent: string
    postId: string
    level: 1 | 2 //如果是一级评论传1 二级评论传2
}

// 收藏帖子的接口
export interface CollectParams {
    postId: string
    toCollect: boolean
}

// 获取评论的接口
export interface CommentGetParams {
    postId: string
}

// 加载更多评论的接口
export interface MoreCommentParams {
    commentId: string // 该ID为父评论的id查出
}