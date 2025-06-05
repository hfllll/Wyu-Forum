// 通用API类型定义
export interface ApiResponse<T = any> {
    code: number
    data: T
    message: string
    errorCode: number
}

// 分页请求
export interface PaginationParams {
    pageNum: number
    pageSize: number
}

// 分页响应
export interface PaginationResponse<T = any> {
    records: T[]
    total: number
    pages: number
    size: number
    current: number 
}

// 定义防抖配置接口i
export interface DebounceConfig {
    wait?: number // 防抖等待的时间毫秒，默认300ms
    requestId?: string // 魏毅请求标识，用于区分不同的请求
}