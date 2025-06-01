// 请求和响应拦截器
import type { AxiosInstance,  AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores'
const userStore = useUserStore()

export function setupInterceptors(instance: AxiosInstance):void {
    // 请求拦截器
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // 添加请求头
            config.headers.Authorization = `Bearer ${userStore.userInfo?.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // 响应拦截器
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            const { code, data, message } = response.data;
            if (code === 200 || code === 0) {
                return response;
            } else {
                // 处理业务错误，抛出明确的错误对象
                const error = new Error(message || '业务错误');
                error.name = 'BusinessError';
                return Promise.reject(error);
            }
        },
        (error) => {
            if (error.response) {
                const { status } = error.response;
                let errorMessage = '请求失败';
                switch (status) {
                    case 401:
                        errorMessage = '未授权，请登录';
                        // 可添加跳转登录页逻辑
                        break;
                    case 403:
                        errorMessage = '禁止访问';
                        break;
                    case 404:
                        errorMessage = '资源不存在';
                        break;
                    case 500:
                        errorMessage = '服务器错误';
                        break;
                    default:
                        errorMessage = `HTTP 错误: ${status}`;
                }
                const httpError = new Error(errorMessage);
                httpError.name = 'HttpError';
                return Promise.reject(httpError);
            }
            return Promise.reject(error);
        }
    );
}