<script lang="ts" setup>
import router from '@/routers';
import { useUserStore } from '@/stores';
import { ref, onMounted } from 'vue';
import { setTheme } from '@/utils/theme'
import type { Theme } from '@/types'

const userStore = useUserStore()
const searchKeyword = ref('')
const currentTheme = ref<Theme>('light')

// 常用主题列表
const commonThemes: {name: Theme, label: string, icon?: string}[] = [
    { name: 'light', label: '浅色', icon: 'sun' },
    { name: 'dark', label: '深色', icon: 'moon' },
    { name: 'cupcake', label: '纸杯蛋糕' },
    { name: 'cyberpunk', label: '赛博朋克' },
    { name: 'forest', label: '森林' },
    { name: 'dracula', label: '德古拉' }
]

// 切换主题
const changeTheme = (theme: Theme) => {
    currentTheme.value = theme
    setTheme(theme)
    localStorage.setItem('THEME', theme)
}

// 跳转到主题设置页面
const goToThemeSettings = () => {
    router.push('/settings')
}

const handleLogout = () => {
    userStore.logout()
    router.push('/login')
}

const handleSearch = (event: Event) => {
    event.preventDefault()
    if (searchKeyword.value.trim()) {
        router.push({
            path: '/search',
            query: { keyword: searchKeyword.value.trim() }
        })
        searchKeyword.value = ''
    }
}

// 组件挂载时，从本地存储获取当前主题
onMounted(() => {
    const savedTheme = localStorage.getItem('THEME') || 'light'
    currentTheme.value = savedTheme as Theme
})
</script>

<template>
    <!-- 顶部导航栏 -->
    <div class="navbar bg-base-100 shadow-lg">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><router-link to="/" class="font-medium">首页</router-link></li>
                    <li><router-link to="/topics" class="font-medium">话题</router-link></li>
                    <li><router-link to="/discover" class="font-medium">发现</router-link></li>
                </ul>
            </div>
            <router-link to="/" class="btn btn-ghost text-xl">WYU论坛</router-link>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li><router-link to="/" class="font-medium">首页</router-link></li>
                <li><router-link to="/topics" class="font-medium">话题</router-link></li>
                <li><router-link to="/discover" class="font-medium">发现</router-link></li>
            </ul>
        </div>
        <div class="navbar-end">
            <!-- 主题切换按钮 -->
            <div class="dropdown dropdown-end mr-2">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                    <!-- 根据当前主题显示不同图标 -->
                    <svg v-if="currentTheme === 'light'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <svg v-else-if="currentTheme === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                </div>
                <div tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <div class="p-2">
                        <h3 class="font-medium mb-2">主题切换</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <template v-for="theme in commonThemes" :key="theme.name">
                                <button 
                                    @click="changeTheme(theme.name)"
                                    class="btn btn-sm w-full justify-start"
                                    :class="{'btn-primary': currentTheme === theme.name, 'btn-ghost': currentTheme !== theme.name}"
                                    :data-theme="theme.name"
                                >
                                    <!-- 浅色图标 -->
                                    <svg v-if="theme.icon === 'sun'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <!-- 深色图标 -->
                                    <svg v-else-if="theme.icon === 'moon'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                    <!-- 其他主题用圆点表示 -->
                                    <div v-else class="w-4 h-4 rounded-full bg-primary mr-1"></div>
                                    {{ theme.label }}
                                </button>
                            </template>
                        </div>
                        <div class="divider my-2">或</div>
                        <button @click="goToThemeSettings" class="btn btn-sm btn-outline w-full">
                            更多主题设置
                        </button>
                    </div>
                </div>
            </div>

            <form @submit="handleSearch" class="form-control mr-2">
                <div class="input-group">
                    <input 
                        v-model="searchKeyword" 
                        type="text" 
                        placeholder="搜索" 
                        class="input input-bordered w-24 md:w-auto focus:outline-primary" 
                    />
                    <!-- <button type="submit" class="btn btn-square btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button> -->
                </div>
            </form>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar avatar-placeholder">
                    <div v-if="userStore.isLoggedIn" class="w-10 rounded-full text-center">
                        <img alt="用户头像"  :src='userStore.userInfo?.avatar' />
                    </div>
                    <div v-else class="bg-neutral text-neutral-content w-24 rounded-full">
                        <span class="text-3xl">D</span>
                    </div>
                </div>
                
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li class="animate__animated animate__wobble">
                        <router-link to="/profile">个人资料</router-link>
                    </li>
                    <li>
                        <router-link to="/settings">设置</router-link>
                    </li>
                    <li @click="handleLogout"><a>退出</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>