export interface AlertData {
  title?: string
  type?: 'error' | 'info' | 'success' | 'warning'
}

// 这是组件实例的一个类型定义
export interface AlertInstance {
  show: (data: AlertData) => void // 确保 show 方法接受AlertData对象
}

// 回到顶部的按钮传参
export interface BacktopProps {
  left?: number
  top?: number
  right?: number
  bottom?: number
  visibilityHeight?: number  // 多高高度出现该按钮
}