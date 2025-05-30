// 通用API类型定义
export interface ApiResponse<T = any> {
    code: number
    data: T
    message: string
}

// 分页请求
export interface PaginationParams {
    pageNum: number
    pageSize: number
}

// 分页响应
export interface PaginationResponse<T = any> {
    list: T[],
    total: number
    pageNum: number
    pageSize: number
}