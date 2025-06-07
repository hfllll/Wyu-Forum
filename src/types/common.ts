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

// daisyUI配套的主题类型
export type Theme = 'light' | 'dark'| 'cupcake' | 'bumblebee' | 'corporate' | 'emerald' | 'synthwave' | 'retro' | 'cyberpunk' | 'valentine' | 'halloween' | 'garden' | 'forest' | 'aqua' | 'lofi' | 'pastel' | 'fantasy' | 'wireframe' | 'black' | 'luxury' | 'dracula' | 'cmyk' | 'autumn' | 'business' | 'acid' | 'lemonade' | 'night' | 'coffee' | 'winter' | 'dim ' | 'nord' | 'sunset' | 'caramellatte' | 'abyss' | 'silk'


