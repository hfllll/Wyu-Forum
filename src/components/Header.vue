<script lang="ts" setup>
import router from '@/routers';
import { useUserStore } from '@/stores';
import { ref } from 'vue';

const userStore = useUserStore()
const searchKeyword = ref('')

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