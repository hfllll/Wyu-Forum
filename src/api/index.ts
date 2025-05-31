// api模块统一导出

// 导出所有请求示例
export { default as request, http} from '@/api/request'

// 导出所有模块API
export * from '@/api/modules/post'
export * from '@/api/modules/user'

// 导出所有类型
export * from '@/api/type'