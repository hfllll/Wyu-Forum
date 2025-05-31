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
            <div class="form-control mr-2">
                <input type="text" placeholder="搜索" class="input input-bordered w-24 md:w-auto" />
            </div>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="用户头像" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li class="animate__animated animate__wobble"><a>个人资料</a></li>
                    <li><a>设置</a></li>
                    <li><a>退出</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>