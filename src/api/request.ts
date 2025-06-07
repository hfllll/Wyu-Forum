// 封装axios请求
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { setupInterceptors } from '@/api/interceptors'


// 创建axios实例
const request: AxiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 设置拦截器
setupInterceptors(request)

// 封装请求方法
export const http = {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return request.get(url, config).then(res => res.data)
    },
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        // 如果data是FormData，自动设置正确的Content-Type (浏览器会自动设置带boundary的multipart/form-data)
        // if (data instanceof FormData) {
        //     return request.post(url, data, {
        //         ...config,
        //         headers: {
        //             ...config?.headers,
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     }).then(res => res.data)
        // }
        return request.post(url, data, config).then(res => res.data)
    },
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return request.put(url, data, config).then(res => res.data)
    },
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return request.delete(url, config).then(res => res.data)
    }
}

export default request