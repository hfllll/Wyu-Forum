// src/utils/timeAgo.ts
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn' // 中文语言包

// 启用relativeImte插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

type Timestamp = string | number | Date

export function timeAgo(timestamp: Timestamp) {
  if (!timestamp) return '未知时间'

  // 适配10位（秒）或13位（毫秒）时间错
  const time = typeof timestamp === 'number' && String(timestamp).length === 10 ? timestamp * 1000 : timestamp

  const date = dayjs(time)

  // 检查是否为有效时间
  if (!date.isValid()) return '无效时间'

  return date.fromNow()
}