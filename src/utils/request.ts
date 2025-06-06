import axios from 'axios'
import { debounce } from 'lodash'
import type { AxiosRequestConfig } from 'axios'

// 创建请求Map，用于存储进行中的请求
const pendingRequests = new Map()

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api', 
  timeout: 15000
})

// 生成请求Key
const generateRequestKey = (config: AxiosRequestConfig): string => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// 防抖请求映射，用于存储防抖函数
const debounceRequestMap = new Map()

// 添加请求拦截器，实现请求防抖
service.interceptors.request.use(
  (config) => {
    // 生成请求Key
    const requestKey = generateRequestKey(config)
    
    // 如果是GET请求，应用防抖
    if (config.method?.toLowerCase() === 'get') {
      // 获取对应的防抖函数，如果没有则创建
      if (!debounceRequestMap.has(requestKey)) {
        // 创建防抖函数，延迟300ms
        const debouncedRequest = debounce(
          (resolve) => {
            // 移除防抖函数，确保下次请求重新创建
            debounceRequestMap.delete(requestKey)
            resolve(true)
          },
          300
        )
        
        debounceRequestMap.set(requestKey, debouncedRequest)
      }
      
      const debounceFn = debounceRequestMap.get(requestKey)
      
      // 如果配置中没有禁用防抖，则应用防抖
      if (config.headers?.['disable-debounce'] !== 'true') {
        // 返回防抖处理的Promise
        const debouncePromise = new Promise<boolean>((resolve) => {
          debounceFn(resolve)
        })
        
        // 等待防抖结果
        debouncePromise.then(() => {
          // 防抖完成后请求继续
        }).catch(() => {
          // 防抖出错，清理
          debounceRequestMap.delete(requestKey)
        })
      }
    }
    
    // 取消重复请求
    if (pendingRequests.has(requestKey)) {
      const controller = pendingRequests.get(requestKey)
      controller.abort()
      pendingRequests.delete(requestKey)
    }
    
    // 创建新的AbortController
    const controller = new AbortController()
    config.signal = controller.signal
    pendingRequests.set(requestKey, controller)
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 请求完成后，从pendingRequests中移除
    const requestKey = generateRequestKey(response.config)
    pendingRequests.delete(requestKey)
    
    // 根据实际接口返回结构处理数据
    const res = response.data
    
    // 这里可以根据具体业务逻辑判断接口返回是否正常
    if (res.code !== 200) {
      console.error('请求异常:', res.message || '未知错误')
      return Promise.reject(new Error(res.message || '未知错误'))
    }
    
    return res
  },
  (error) => {
    // 处理请求错误
    if (axios.isCancel(error)) {
      console.log('请求已取消:', error.message)
      return Promise.reject(new Error('请求已取消'))
    }
    
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

export default service 