import { createDebouncedApi } from '@/utils/debounce'
import { getTopic, Follow, getPostList } from '@/api'

// 话题相关API防抖
export const debouncedGetTopic = createDebouncedApi('getTopic', getTopic, 300)
export const debouncedFollow = createDebouncedApi('follow', Follow, 500)

// 帖子相关API防抖
export const debouncedGetPostList = createDebouncedApi('getPostList', getPostList, 300)

// 添加更多防抖API...
