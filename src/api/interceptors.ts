// 请求和响应拦截器
import type { AxiosInstance,  AxiosResponse, InternalAxiosRequestConfig } from 'axios'


export function setupInterceptors(instance: AxiosInstance):void {
    // 请求拦截器
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // 添加请求头
            config.headers.Authorization = `Bearer ${123}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // 响应拦截器
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            // 2xx范围内的状态码都会触发该函数
            const {code, data, message} = response.data
            if (code === 200 || code === 0) {
                return data
            } else {
                // 处理业务错误
                
                return Promise.reject(message)
            }
        },
        (error) => {
            // 超出 2xx 范围内的状态码都会触发该函数
            if (error.response) {
                const { status} = error.response

                // 处理不同的HTTP状态码
                switch (status) {
                    case 401:
                        // 未授权，跳转到登录页
                        break
                    case 403:
                        // 禁止访问
                        break
                    case 404:
                        // 资源不存在
                        break
                    case 500:
                        // 服务器错误
                        break
                    default:
                }      
            }
            return Promise.reject(error)
        }
    )
}