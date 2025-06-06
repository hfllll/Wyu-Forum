import { debounce } from 'lodash'

// 防抖Map，用于存储不同接口的防抖函数
const debounceMap = new Map()

// 为防抖API函数定义接口类型
export interface DebouncedApiFunction<T extends (...args: any[]) => Promise<any>> {
  (...args: Parameters<T>): Promise<ReturnType<T>>;
  immediate: (...args: Parameters<T>) => Promise<ReturnType<T>>;
}

/**
 * 创建防抖API调用
 * @param key 接口唯一标识
 * @param fn 要执行的API函数
 * @param wait 等待时间，默认300ms
 * @returns 防抖后的API函数
 */
export function createDebouncedApi<T extends (...args: any[]) => Promise<any>>(
  key: string,
  fn: T,
  wait: number = 300
): DebouncedApiFunction<T> {
  // 如果已经存在相同key的防抖函数，先取消它
  if (debounceMap.has(key)) {
    const existing = debounceMap.get(key)
    existing.cancel()
    debounceMap.delete(key)
  }

  // 创建新的防抖函数
  const debouncedFn = debounce(
    async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      return await fn(...args)
    },
    wait
  )

  // 存储防抖函数
  debounceMap.set(key, debouncedFn)

  // 添加cancel方法
  const wrappedFn = ((...args: Parameters<T>): Promise<ReturnType<T>> => {
      return debouncedFn(...args) as Promise<ReturnType<T>>
  }) as DebouncedApiFunction<T>

  // 添加立即执行的方法
  wrappedFn.immediate = ((...args: Parameters<T>): Promise<ReturnType<T>> => {
    debouncedFn.cancel()
    return fn(...args)
  })

  return wrappedFn
}

/**
 * 清除指定key的防抖函数
 * @param key 接口唯一标识
 */
export function clearDebouncedApi(key: string): void {
  if (debounceMap.has(key)) {
    const debouncedFn = debounceMap.get(key)
    debouncedFn.cancel()
    debounceMap.delete(key)
  }
}

/**
 * 清除所有防抖函数
 */
export function clearAllDebouncedApis(): void {
  for (const [key, debouncedFn] of debounceMap.entries()) {
    debouncedFn.cancel()
    debounceMap.delete(key)
  }
} 