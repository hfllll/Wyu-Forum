import type { Theme } from '@/types'

/**
 * 获取当前主题
 * @returns 当前应用的主题名称
 */
export function getTheme(): Theme {
  const theme = document.documentElement.getAttribute('data-theme') || 'light'
  return theme as Theme
}

/**
 * 设置主题
 * @param theme 主题名称
 */
export function setTheme(theme: Theme): void {
  // 设置文档主题
  document.documentElement.setAttribute('data-theme', theme)
  // 保存到本地存储 持久化
  localStorage.setItem('THEME', theme)
}

/**
 * 初始化主题
 * 从本地存储读取主题设置并应用
 */
export function initTheme(): void {
  const savedTheme = localStorage.getItem('THEME') || 'light'
  setTheme(savedTheme as Theme)
}
