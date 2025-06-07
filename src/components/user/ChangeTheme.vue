<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { setTheme } from '@/utils/theme'
import type { Theme } from '@/types'

// 默认的主题状态
const theme = ref<Theme>('light')

// 控制折叠状态
const isExpanded = ref(false)

// 主题映射表：英文名到中文名的映射
const themeNameMap: Record<string, string> = {
  'light': '浅色',
  'dark': '深色',
  'system': '跟随系统',
  'cupcake': '纸杯蛋糕',
  'bumblebee': '大黄蜂',
  'corporate': '商务',
  'emerald': '祖母绿',
  'synthwave': '合成波',
  'retro': '复古',
  'cyberpunk': '赛博朋克',
  'valentine': '情人节',
  'halloween': '万圣节',
  'garden': '花园',
  'forest': '森林',
  'aqua': '水蓝',
  'lofi': '低保真',
  'pastel': '柔和',
  'fantasy': '幻想',
  'wireframe': '线框',
  'black': '纯黑',
  'luxury': '奢华',
  'dracula': '德古拉',
  'cmyk': 'CMYK',
  'autumn': '秋季',
  'business': '商业',
  'acid': '酸性',
  'lemonade': '柠檬水',
  'night': '夜晚',
  'coffee': '咖啡',
  'winter': '冬季'
}

// 默认显示的主题
const defaultThemes: Theme[] = ['light', 'dark']
// 额外的主题
const extraThemes: Theme[] = [
  'cupcake', 'bumblebee', 'corporate', 'emerald', 
  'synthwave', 'retro', 'cyberpunk', 'valentine', 
  'halloween', 'garden', 'forest', 'aqua', 
  'lofi', 'pastel', 'fantasy', 'wireframe', 
  'black', 'luxury', 'dracula', 'cmyk', 
  'autumn', 'business', 'acid', 'lemonade', 
  'night', 'coffee', 'winter'
]

// 切换折叠状态
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
  
  // 展开后，等待DOM更新，然后滚动到当前主题
  if (isExpanded.value) {
    nextTick(() => {
      scrollToCurrentTheme()
    })
  }
}

// 应用主题
const applyTheme = (themeName: Theme) => {
  theme.value = themeName
  setTheme(themeName)
}

// 滚动到当前主题
const scrollToCurrentTheme = () => {
  if (!isExpanded.value && !defaultThemes.includes(theme.value)) {
    // 如果当前主题在额外主题中且未展开，则展开
    isExpanded.value = true
  }
  
  nextTick(() => {
    const currentThemeElement = document.querySelector(`[data-theme-name="${theme.value}"]`)
    if (currentThemeElement) {
      currentThemeElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })
}

// 组件挂载时，从本地存储获取当前主题
onMounted(() => {
  const savedTheme = localStorage.getItem('THEME') || 'light'
  theme.value = savedTheme as Theme
  
  // 如果当前主题在额外主题中，自动展开并滚动到该主题
  if (extraThemes.includes(theme.value as Theme)) {
    isExpanded.value = true
    nextTick(() => {
      scrollToCurrentTheme()
    })
  }
})
</script>

<template>
    <div class="bg-base-200 p-6 rounded-lg mb-8">
        <h3 class="text-lg font-medium mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            主题设置
        </h3>

        <!-- 基础主题 -->
        <div class="flex flex-wrap gap-4">
            <template v-for="themeName in defaultThemes" :key="themeName">
                <label class="cursor-pointer flex flex-col items-center gap-2" 
                       @click="applyTheme(themeName)"
                       :data-theme-name="themeName">
                    <input v-model="theme" type="radio" :name="themeName" :value="themeName" class="radio radio-primary hidden" />
                    <!-- 浅色主题 -->
                    <div v-if="themeName === 'light'" 
                        class="w-20 h-20 bg-base-100 border-4 rounded-lg flex items-center justify-center transition-all duration-300"
                        :class="{ 'border-primary shadow-lg shadow-primary/30 scale-105': theme === themeName, 'border-base-300': theme !== themeName }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    
                    <!-- 深色主题 -->
                    <div v-else-if="themeName === 'dark'"
                        class="w-20 h-20 bg-neutral text-neutral-content border-4 rounded-lg flex items-center justify-center transition-all duration-300"
                        :class="{ 'border-primary shadow-lg shadow-primary/30 scale-105': theme === themeName, 'border-base-300': theme !== themeName }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </div>

                    
                    <span :class="{'font-bold text-primary': theme === themeName}">{{ themeNameMap[themeName] }}</span>
                </label>
            </template>
            
            <!-- 展开/收起按钮 -->
            <button @click="toggleExpand" class="btn btn-sm btn-outline mt-8">
                {{ isExpanded ? '收起更多主题' : '展开更多主题' }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    :class="{ 'rotate-180': isExpanded }">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>

        <!-- 额外主题（可折叠） -->
        <div v-if="isExpanded" class="flex flex-wrap gap-4 mt-4 pt-4 border-t border-base-300 theme-container">
            <template v-for="themeName in extraThemes" :key="themeName">
                <label class="cursor-pointer flex flex-col items-center gap-2" 
                       @click="applyTheme(themeName)"
                       :data-theme-name="themeName">
                    <input v-model="theme" type="radio" :name="themeName" :value="themeName" class="radio radio-primary hidden" />
                    <div class="w-20 h-20 border-4 rounded-lg flex items-center justify-center transition-all duration-300" 
                        :class="{ 'border-primary shadow-lg shadow-primary/30 scale-105': theme === themeName, 'border-base-300': theme !== themeName }"
                        :data-theme="themeName">
                        <div class="w-12 h-12 rounded-full bg-primary"></div>
                    </div>
                    <span :class="{'font-bold text-primary': theme === themeName}">{{ themeNameMap[themeName] || themeName }}</span>
                </label>
            </template>
        </div>

    </div>
</template>

<style scoped>
.theme-container {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
  scroll-behavior: smooth;
}

.theme-container::-webkit-scrollbar {
  width: 8px;
}

.theme-container::-webkit-scrollbar-track {
  background: var(--fallback-b2,oklch(var(--b2)/1));
  border-radius: 10px;
}

.theme-container::-webkit-scrollbar-thumb {
  background: var(--fallback-p,oklch(var(--p)/0.8));
  border-radius: 10px;
}

.theme-container::-webkit-scrollbar-thumb:hover {
  background: var(--fallback-p,oklch(var(--p)/1));
}
</style>